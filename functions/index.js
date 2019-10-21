const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const server = require('./src/server');
const api = functions.runWith({
  memory: "2GB", timeoutSeconds: 120
}).https.onRequest(server);

module.exports= {
  api
}
