const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  //secret key
  "sk_test_51LmxJpSAYy53XeywtLWPdMtIVKjx0uWtNLM7MujmfcDPOZ6UYXr69gkLZowqL4Wl5ojuTaGIYzhYnKCtRSf16PfO00LKbZmTwW"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentMethod = await stripe.paymentMethods.create({
    type: "card",
    card: {
      number: "4242424242424242",
      exp_month: 9,
      exp_year: 2024,
      cvc: "314",
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    payment_method: "pm_card_visa",

    amount: total, // subunits of the currency
    currency: "usd",
    payment_method_types: ["card"],
    statement_descriptor: "Custom descriptor",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api
