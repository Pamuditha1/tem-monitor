const mongoose = require("mongoose");

const Alert = mongoose.model(
  "Alert",
  new mongoose.Schema({
    sensor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensor",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    temperature: {
      type: String,
      required: true,
    },
  })
);

exports.Alert = Alert;
