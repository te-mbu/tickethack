const express = require("express");
const router = express.Router();
const Cart = require("../models/carts");

// POST /cart - Add a trip to the cart database
// body: departure, arrival, date, price
router.post("/", (req, res) => {
  const body = req.body;

  const newCart = new Cart({
    departure: body.departure,
    arrival: body.arrival,
    date: body.date,
    price: body.price,
  });

  newCart.save().then(() => {
    res.json({ result: true });
  });
});

// Delete /cart
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

// GET /cart - Get all trips in cart
router.get("/", (req, res) => {
    Cart.find().then(allTrips => {
        res.json({result: true, data: allTrips})
    })
})

module.exports = router;
