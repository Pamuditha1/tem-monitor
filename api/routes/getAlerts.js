const express = require("express");
const router = express.Router();

const { Alert } = require("../modules/alertsModule");

router.get("/sensor/:id", async (req, res) => {
  const alerts = await Alert.find({ sensor: req.params.id })
    .sort({ timestamp: "desc" })
    .populate("sensor");

  res.status(200).send(alerts);
});

router.get("/all/:user", async (req, res) => {
  const alerts = await Alert.find({ user: req.params.user })
    .sort({ timestamp: "desc" })
    .populate("sensor");

  res.status(200).send(alerts)
});

module.exports = router;
