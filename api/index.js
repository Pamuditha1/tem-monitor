const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

// const env = require("./envVariables");

const register = require("./routes/registerRoute");
const login = require("./routes/loginRoute");
const addSensor = require("./routes/addSensorRoute");
const getSensors = require("./routes/getSensors");
const addRecords = require("./routes/addRecords");
const getRecords = require("./routes/getRecords");
const getAlerts = require("./routes/getAlerts");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Could not Connect to mongoDB", err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/add-sensor", addSensor);
app.use("/api/get-sensors", getSensors);
app.use("/api/add-records", addRecords);
app.use("/api/get-records", getRecords);
app.use("/api/get-alerts", getAlerts);
app.use("/api/register", register);
app.use("/api/login", login);

app.listen(3003, () => {
  console.log("Server is Listening on port 3003");
});
