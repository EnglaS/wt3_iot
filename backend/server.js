import express from 'express'
import mongoose from 'mongoose'
import SensorData from './models/sensorModel.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Lös __dirname för ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

// Path till ../public från /src/server.js
const publicPath = path.resolve(__dirname, '../public')
app.use(express.static(publicPath))

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/iotdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

app.get('/iot-api/data', async (req, res) => {
    try {
        const { since } = req.query
        const filter = since ? { timestamp: { $gte: new Date(since) } } : {}

        const data = await SensorData.find(filter)
            .sort({ timestamp: -1 })
            .limit(10000)
            .exec()

        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' })
    }
})

app.get('/iot-api/latest', async (req, res) => {
    try {
      const latest = await SensorData.findOne().sort({ timestamp: -1 }).exec()
      res.json(latest)
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch latest data' })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
