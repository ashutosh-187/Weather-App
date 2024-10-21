const express = require("express")
const controller = require("../controllers/controller")
const router = express.Router()

router.use((req, res, next)=>{
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    )
    next()
})
router.get("/current-weather", controller.weatherUpdates)
router.get("/generate-summary", controller.generateSummary)
router.get("/latest-data", controller.latestData)
router.get("/weather-summary", controller.latestSummary)

module.exports = router;