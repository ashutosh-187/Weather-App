const mongoose = require("mongoose")

const weatherModel = mongoose.model("weatherModel", new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    main: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    iconId: {
        type: String,
        required: true
    }, 
    temperature: {
        type: Number,
        required: true,
    },
    feelsLike: {
        type: Number,
        required: true,
    },
    min_temp: {
        type: Number,
        required: true,
    },
    max_temp: {
        type: Number,
        required: true,
    },
    pressure: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}))

module.exports = weatherModel