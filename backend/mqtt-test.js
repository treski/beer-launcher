const e = require('cors')

const mqtt = require('mqtt'),
  mqttServer = 'mqtt://localhost:1883',
  mqttTopic = `/launch-beer/`,
  client  = mqtt.connect(mqttServer)

client.on('connect', () => {
  client.subscribe(mqttTopic, (err) => {
    if(!err) {
        console.log(`CONNECTED TO ${mqttServer} and subscribed to ${mqttTopic}`)
    } else {
      print(err)
    }
  })
})

client.on('message', (topic, message) => {
  const position = message.toString()
  print(`Launching beer to ${position}`)
})