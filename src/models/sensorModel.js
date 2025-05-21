import mongoose from "mongoose"

const sensorSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    temperature: Number,
    humidity: Number,
    pressure: Number,
    tvoc: Number,
    eco2: Number,
    aqi: Number,
    plants: Array
})

export default mongoose.model("SensorData", sensorSchema)
