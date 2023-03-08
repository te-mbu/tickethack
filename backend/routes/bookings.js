const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");

// POST /bookings - Add a trip to the booking database
// body: departure, arrival, date, price
router.post("/", (req, res) => {
  const body = req.body;

  const newBooking = new Booking({
    departure: body.departure,
    arrival: body.arrival,
    date: new Date(body.date),
    price: body.price,
  });

  newBooking.save().then(() => {
    res.json({ result: true });
  });
});

// Delete /bookings
// body: departure, arrival, date, price
router.delete("/", (req, res) => {
  const body = req.body;

  Booking.deleteOne({
    departure: body.departure,
    arrival: body.arrival,
    date: new Date(body.date),
    price: body.price,
  }).then((data) => {
    if (data.deletedCount === 1) {
      res.json({ result: true, message: "Trip deleted from booking" });
    } else {
      res.json({ result: false, error: "No trip found" });
    }
  });
});

// GET /bookings - Get all trips in booking
router.get("/", (req, res) => {
    Booking.find().then(allTrips => {
        res.json({result: true, data: allTrips})
    })
})

// DELETE /bookings
router.delete("/all", (req, res) => {
  Booking.deleteMany().then(() => {
      res.json({result: true})
  })
})

module.exports = router;
