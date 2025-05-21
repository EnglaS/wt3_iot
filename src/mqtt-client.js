import mqtt from 'mqtt'
import SensorData from './models/sensorModel.js'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/iotdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

const options = {
    host: 'cscloud7-148.lnu.se',
    port: 1883,
    protocol: 'mqtt',
    username: 'iotlab',
    password: 'iotlab'
}

const client = mqtt.connect(options)

client.on('connect', () => {
    console.log('Connected to MQTT broker')
    client.subscribe('data/1dv027', (err) => {
        if (err) {
            console.error('Failed to subscribe to topic', err)
        } else {
            console.log('Subscribed to data/1dv027')
        }
    })
})

client.on('message', (topic, message) => {
    try {
        const json = JSON.parse(message.toString())
        console.log('Received data:', json)

        const entry = new SensorData(json)
        entry.save().then(() => {
            console.log('Data saved to MongoDB')
        })
      } catch (err) {
        console.error('Failed to parse message as JSON:', err)
      }
})



