const axios = require("axios")
const express = require("express")
const cookieParser = require("cookie-parser")
const router = require("./routes/route")
const mongoose = require("mongoose")
const cors = require("cors")
const service = require("./services/service")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/', router)

app.listen(3000, ()=>{
    console.log("Server is running at port =>", 3000)
    service.scheduleWeatherUpadates()
})

mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log("Connected to MongoDB")
}).catch(()=>{
    console.log("Unable to connect with MongoDB")
})