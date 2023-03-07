var express = require('express');
var router = express.Router();
const Trip = require("../models/trips")
const { filteredByDate } = require("../modules/filteredByDate")

// POST /trips - Find matching trips
// body: departure, arrival, date
router.post("/", (req, res) => {
    const body = req.body
    Trip.find({departure: body.departure, arrival: body.arrival })
        .then(trips => {
            // Filtered by date
            const filteredTrips = filteredByDate(trips, body.date)

            if (filteredTrips.length !== 0) {
                res.json({ result: true, data: filteredTrips})
            } else {
                res.json({result: false, error: "No trip found"})
            }
        })
})

// GET /trips - Get all trips
router.get("/", (req, res) => {
    Trip.find().then(allTrips => {
        res.json({result: true, data: allTrips})
    })
})

module.exports = router