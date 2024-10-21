const weatherModel = require("../models/model")
const summaryModel = require("../models/summary")
const axios = require("axios")
const cron = require('node-cron')

getCoordinates = async (location) => {
    try {
        const { city, state, country } = location
        const response = await axios.get(`${process.env.ONE_WEATHER_BASE_URL}/geo/1.0/direct?q=${city},${state},${country}a&appid=${process.env.ONE_WEATHER_API_KEY}`)
        const coordinates = {
            lat: response.data[0].lat,
            lon: response.data[0].lon
        }
        return coordinates
    } catch (error) {
        console.log("*****! Coordination Service !*****", error)
        throw new Error("Unable to fetch coordinates.")
    }
}

saveWeatherData = async (weatherData) => {
    try {
        const data = new weatherModel(weatherData)
        await data.save()
        return "Weather update saved in DB."
    } catch (error) {
        console.log(error)
        throw new Error("Unable to save weather update in DB.")
    }
}

exports.getWeatherUpdates = async () => {
    try {
        const cities = [
            { city: "Delhi", state: "Delhi", country: "India" },
            { city: "Mumbai", state: "Maharashtra", country: "India" },
            { city: "Chennai", state: "Tamil Nadu", country: "India" },
            { city: "Bengaluru", state: "Karnataka", country: "India" },
            { city: "Kolkata", state: "West Bengal", country: "India" },
            { city: "Hyderabad", state: "Telangana", country: "India" }
        ];
        const weatherUpdates = await Promise.all(
            cities.map(async (city) => {
                try {
                    const coordinates = await getCoordinates(city);
                    if (!coordinates) {
                        throw new Error(`Coordinates not found for ${city.city}`);
                    }
                    const { lat, lon } = coordinates;
                    const response = await axios.get(`${process.env.ONE_WEATHER_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.ONE_WEATHER_API_KEY}`);
                    const weatherData = {
                        location: city.city,
                        main: response.data.weather[0].main,
                        description: response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1),
                        iconId: response.data.weather[0].icon,
                        temperature: response.data.main.temp,
                        feelsLike: response.data.main.feels_like,
                        min_temp: response.data.main.temp_min,
                        max_temp: response.data.main.temp_max,
                        pressure: response.data.main.pressure,
                        humidity: response.data.main.humidity,
                        date: new Date(response.data.dt * 1000)
                    };
                    await saveWeatherData(weatherData);
                    return weatherData;
                } catch (error) {
                    console.error(`Error fetching data for ${city.city}:`, error);
                    return null;
                }
            })
        );
        return "Weather updates fetched and saved in DB."
    } catch (error) {
        console.error("Error in getWeatherUpdates:", error);
        throw new Error("Unable to fetch weather updates.");
    }
};

exports.scheduleWeatherUpadates = async () => {
    try {
        await this.getWeatherUpdates();
        cron.schedule('*/30 * * * *', async () => {
            console.log("Schedular updated weather DB.")
            await this.getWeatherUpdates();
        });
    } catch (error) {
        console.error('Error in scheduling weather updates:', error);
    }
}

dominatingWeather = (weatherData) => {
    const temp = {}
    weatherData.map((ele) => {
        weather = ele.main
        if (temp[weather]) {
            temp[weather]++
        } else {
            temp[weather] = 1
        }
    })
    let maxFrequency = 0
    let dominationWeather = undefined
    for (weatherCategory in temp) {
        if (temp[weatherCategory] > maxFrequency) {
            maxFrequency = temp[weatherCategory]
            dominationWeather = weatherCategory
        }
    }
    return dominationWeather
}

exports.generateSummary = async (city) => {
    try {
        const cities = ["Delhi", "Mumbai", "Chennai", "Bengaluru", "Kolkata", "Hyderabad"]
        const generateSummary = await Promise.all(
            cities.map(async (city)=>{
                const weatherData = await weatherModel.find({ location: city }).sort({ date: -1 })
                const latestWeather = weatherData[0]
                const summary = {
                    location: city,
                    date: latestWeather.date,
                    dominant: dominatingWeather(weatherData),
                    iconId: latestWeather.iconId,
                    min_temp: latestWeather.min_temp,
                    max_temp: latestWeather.max_temp,
                    avg_temp: (latestWeather.max_temp + latestWeather.min_temp)//2
                }
                await new summaryModel(summary).save()
                return summary
            })
        )
        // await weatherModel.deleteMany({})
        return generateSummary
    } catch (error) {
        console.log(error);
    }
}

exports.fetchLatestSummary = async()=>{
    try {
        const cities = ["Delhi", "Mumbai", "Chennai", "Bengaluru", "Kolkata", "Hyderabad"]
        const summary = await Promise.all(
            cities.map(async (city)=>{
                const data = await summaryModel.find({location: city}).sort({date: -1})
                return data[0]
            })
        )
        return summary
    } catch (error) {
        console.log(error)
        throw new Error("Unable to fetch latest summary from DB.")
    }
}

exports.fetchLatestUpadate = async()=>{
    try {
        const cities = ["Delhi", "Mumbai", "Chennai", "Bengaluru", "Kolkata", "Hyderabad"]
        const citiesUpdate = await Promise.all(
            cities.map(async (city)=>{
                const data = await weatherModel.find({location: city}).sort({date : -1})
                return data[0]
            })
        )
        return citiesUpdate
    } catch (error) {
        console.log(error)
        throw new Error("Unable to fetch latest weather data from DB.")
    }
}