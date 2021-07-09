const express = require("express");
const router = express.Router();

const { Record } = require("../modules/recordsModule");
const { Sensor } = require("../modules/sensorModule");
const { Alert } = require("../modules/alertsModule");

router.post("/", async (req, res) => {
  let date = "";
  if (req.body.date) {
    date = new Date(req.body.date).toISOString();
  } else {
    date = new Date().toISOString();
  }

  const sensor = await Sensor.findOne({ sensor_id: req.body.sensor_id });

  if (sensor.threshold_value <= req.body.temperature) {
    console.log("Alert", sensor._id);
    let newAlert = new Alert({
      sensor: sensor._id,
      user: sensor.user,
      timestamp: date,
      temperature: req.body.temperature,
    });
    newAlert.save();
  }

  let newRecord = new Record({
    sensor: sensor._id,
    timestamp: date,
    temperature: req.body.temperature,
  });

  newRecord
    .save()
    .then(() => {
      res.status(200).send("Record Successfully Added");
    })
    .catch((e) => {
      console.log("Error", e);
    });

  return;
});

module.exports = router;
