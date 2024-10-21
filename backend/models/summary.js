const mongoose = require("mongoose")

const summaryModel = mongoose.model("summaryModel", new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    iconId: {
        type: String,
        required: true
    },
    min_temp: {
        type: Number,
        required: true,
    },
    max_temp: {
        type: Number,
        required: true,
    },
    avg_temp: {
        type: Number,
        required: true,
    }
}))

module.exports = summaryModel