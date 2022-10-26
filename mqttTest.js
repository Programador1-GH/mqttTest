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
      TODO:// Ver si se puede poner un parametro para time out en caso de que no se pueda resolver la url
      client = mqtt.connect(config.mqttConnectUrl,connectOptions);
      client.on('connect', () => {
        const timeStamp = new Date().toString().slice(16, 24);
        console.log (`${timeStamp} mqttTest conected to ${config.mqttConnectUrl}`);
        console.log (``); //Dejo una linea en blanco para que la borre "process.stdout.clearLine(1);" la primera vez.
        client.subscribe(config.statusTopic, (err) => {
          if (!err) {
            client.publish(config.statusTopic, `mqttTest.js suscribed to ${config.statusTopic}`);
          } else {
            console.error(err);
          }
        });
        client.subscribe(config.execTopic, (err) => {
          if (!err) {
            client.publish(config.statusTopic, `mqttTest.js suscribed to ${config.execTopic}`);
          } else {
            console.error(err);
          }
        })
      });
      client.on('message', (topic, payload) => {
          process.stdout.moveCursor(0,-1);
          process.stdout.clearLine(1);  
          const timeStamp = new Date().toString().slice(16, 24);          
          console.log(`${timeStamp} "${topic}" ${payload.toString()}`);
          console.log (`${timeStamp} mqttTest online, press control+C to cancel...`);
          //client.end()
        });
  } catch (error) {
      console.log(error);
  }
}

main();