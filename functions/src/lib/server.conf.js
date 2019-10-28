function optionsMQTT() {
  return {
    port: 14697, // functions.config().mqtt.server.port,
    host: 'mqtt://farmer.cloudmqtt.com', // functions.config().mqtt.server.host,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'nvknfifu', // functions.config().mqtt.server.user,
    password: 'atblMjlpbdob', // functions.config().mqtt.server.password,
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
  };
}
module.exports = {
  optionsMQTT
};
