const admin = require('firebase-admin');
const db = admin.firestore();

async function getAllLanguages(_req, res) {
  try {

    const languagesQuerySnapshot = await db.collection('languages').get();
    const languages = [];
    languagesQuerySnapshot.forEach(
      (doc) => {
        languages.push({
          id: doc.id,
          data: doc.data()
        });
      }
    );

    return res.json({
      succes: true,
      data: languages
    });

  } catch(error){
    return res.json({
      succes: false,
      data: error
    });
  }
}

async function getLanguage(req, res) {
  const requiredLanguage = req.params.language;

  let citiesRef = await db.collection('languages')
    .where('name', '==', requiredLanguage).get();

  const languages = [];
  citiesRef.forEach(
    (doc) => {
      languages.push({
        id: doc.id,
        data: doc.data()
      });
    }
  );
  const exists = languages.length > 0;
  return res
    .status(exists ? 200 : 404)
    .json({
      succes: exists,
      data: exists ? languages[0] : 'Language not found'
    })
}

async function addLanguage(req, res) {
  const language = req.body;

  let langRef = await db.collection('languages')
    .add(language);
  let doc = await langRef.get();

  return res
    .status(201)
    .json({
      succes: true,
      data: {
        id: doc.id,
        data: doc.data()
      }
    })
}


async function updateLanguage(req, res) {

}

async function deleteLanguage(req, res) {
  const requiredLanguage = req.params.language;

  let querySnapshot = await db.collection('languages')
    .where('name', '==', requiredLanguage).get()

  querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  })

  return res
    .status(204)
    .json({
      succes: true,
      data: {}
    })
}

module.exports = {
  getAllLanguages,
  getLanguage,
  addLanguage,
  updateLanguage,
  deleteLanguage
}
