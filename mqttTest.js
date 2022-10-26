//Archivo para escuchar topics en mqtt

const mqtt = require('mqtt');
const config = require("./config.js");

function main () {
  let client = null;
  const connectOptions = {
    'username': config.mqttUser,
    'password': config.mqttPassword
  }
  try {   
      client = mqtt.connect(config.mqttConnectUrl,connectOptions);
      client.on('connect', () => {
        const timeStamp = new Date().toString().slice(16, 24);
        console.log (`${timeStamp} mqttTest conected to ${config.mqttConnectUrl}`);
        client.subscribe(config.statusTopic, (err) => {
          if (!err) {
            client.publish(config.statusTopic, `mqttTest.js suscribed to ${config.statusTopic}`);
          }
        });
        client.subscribe(config.execTopic, (err) => {
          if (!err) {
            client.publish(config.statusTopic, `mqttTest.js suscribed to ${config.execTopic}`);
          }
        })
      });
      client.on('message', (topic, message) => {
          const timeStamp = new Date().toString().slice(16, 24);
          console.log(`${timeStamp} "${topic}" ${message.toString()}`);
          //client.end()
        });
      const timeStamp = new Date().toString().slice(16, 24);
      console.log (`${timeStamp} mqttTest online, press control+C to cancel...`);
  } catch (error) {
      console.log(error);
  }
}

main();