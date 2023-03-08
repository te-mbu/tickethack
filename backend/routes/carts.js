const express = require("express");
const router = express.Router();
const Cart = require("../models/carts");

// POST /carts - Add a trip to the cart database
// body: departure, arrival, date, price
router.post("/", (req, res) => {
  const body = req.body;

  const newCart = new Cart({
    departure: body.departure,
    arrival: body.arrival,
    date: body.date,
    price: body.price,
  });

  // Check if the trip is already in the database
  Cart.find({departure:body.departure,
    arrival: body.arrival,
    date: body.date,
    price: body.price}).then(data => {
      if (data.length === 0) {
        newCart.save().then(() => {
          res.json({ result: true });
        });
      } else {
        res.json({result: false, error: "Trip is already in the Cart database"})
      }
    })
});

// Delete /carts
// body: departure, arrival, date, price
router.delete("/", (req, res) => {
  const body = req.body;

  Cart.deleteOne({
    departure: body.departure,
    arrival: body.arrival,
    date: new Date(body.date),
    price: body.price,
  }).then((data) => {
    if (data.deletedCount === 1) {
      res.json({ result: true, message: "Trip deleted from cart" });
    } else {
      res.json({ result: false, error: "No trip found" });
    }
  });
});

// GET /carts - Get all trips in cart
router.get("/", (req, res) => {
    Cart.find().then(allTrips => {
        res.json({result: true, data: allTrips})
    })
})

// DELETE /carts
router.delete("/all", (req, res) => {
  Cart.deleteMany().then(() => {
      res.json({result: true})
  })
})
module.exports = router;
