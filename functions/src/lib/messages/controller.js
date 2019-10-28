const db = require('./db');
const mqttMessages = require('./mqtt');

async function getAllMessages(_req, res) {
  try {
    return res.json({
      succes: true,
      data: await db.getAllMessages()
    });

  } catch(error){
    return res.json({
      succes: false,
      data: error
    });
  }
}

async function getMessage(req, res) {
  const id = req.params.id;
  const dbItem = await db.getMessage(id);
  return res
    .status(dbItem ? 200 : 404)
    .json({
      succes: dbItem !== undefined,
      data: dbItem !== undefined ? dbItem : 'message not found'
    })
}

async function addMessage(req, res) {
  let item = req.body;
  item = await mqttMessages.sendMessage(item);
  return res
    .status(201)
    .json({
      succes: true,
      data: item
    })
}

module.exports = {
  getAllMessages,
  getMessage,
  addMessage
};
