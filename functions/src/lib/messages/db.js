const admin = require('firebase-admin');
const db = admin.firestore();
const collectionName = 'messages'

async function getAllMessages() {
  const languagesQuerySnapshot = await db.collection(collectionName).get();
  const languages = [];
  languagesQuerySnapshot.forEach(
    (doc) => {
      languages.push({
        id: doc.id,
        data: doc.data()
      });
    }
  );
  return languages;
}

async function getMessage(id) {
  let doc = await db.collection(collectionName)
    .doc(id);
  if(doc.exists) {
    return {
      id: doc.id,
      data: doc.data()
    }
  }
  return undefined;
}

async function addMessage(message) {
  let langRef = await db.collection(collectionName)
    .add(message);
  let doc = await langRef.get();
  return {
    id: doc.id,
    data: doc.data()
  };
}

module.exports = {
  getAllMessages,
  getMessage,
  addMessage
};
