const axios = require('axios')
const service = require('../services/service')

exports.weatherUpdates = async (req, res) => {
    try {
        const weatherUpdate = await service.getWeatherUpdates();
        res.status(200).send(weatherUpdate);
    } catch (error) {
        console.log("*****! Current Weather Data API !*****", error)
        res.status(501).send("Unable to fetch weather data.")
    }
}

exports.generateSummary = async (req, res) => {
    try {
        const summary = await service.generateSummary()
        res.status(200).send(summary)
        // res.status(200).send("Weather Summary stored in DB.")
    } catch (error) {
        console.log(error);
        res.status(400).send("Unable to fetch summary.")
    }
}

exports.latestData = async(req, res)=>{
    try {
        const data = await service.fetchLatestUpadate()
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        
        res.status(400).send("Unable to fetch weather data from DB.")
    }
}

exports.latestSummary = async(req, res)=>{
    try {
        const data = await service.fetchLatestSummary()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send("Unable to fetch summary data from DB.")
    }
}