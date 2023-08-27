const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
const path = require("path");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "assets")));
const Razorpay = require("razorpay");
require("dotenv").config();

app.get("/", (req, res) => {
  res.render("Index");
});

app.post("/orders", async (req, res) => {
  let amount = 500;

  var instance = new Razorpay({
    key_id: process.env.KEY,
    key_secret: process.env.SECRET,
  });

  try {
    const order = await instance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "order_rcptid_11",
    });
    console.log(order);
    res.status(201).json({
      success: true,
      order,
      amount,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to create order");
  }
});

app.listen(port, () => console.log("listening on port " + port));
