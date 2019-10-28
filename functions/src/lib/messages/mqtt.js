const db = require('./db');
const conf = require('../server.conf');
const asyncMQTT = require("async-mqtt");

async function init() {
  const client = await asyncMQTT.connect(conf.optionsMQTT().host, conf.optionsMQTT());
  client.subscribe('iot/message')
    .then((message) => {
      return message;
    }).catch();
}
init();

async function sendMessage(message){
  const client = await asyncMQTT.connect(conf.optionsMQTT().host, conf.optionsMQTT());
  try {
    await client.publish('iot/message', JSON.stringify(message));
    // This line doesn't run until the server responds to the publish
    await client.end();
    // This line doesn't run until the client has disconnected without error
    console.log("Done");
  } catch (e){
    // Do something about it!
    console.log(e.stack);
    process.exit();
  }
  return message;
}

module.exports = {
  sendMessage
};


