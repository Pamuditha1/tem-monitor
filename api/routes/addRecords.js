const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const nodemailMailGun = require('nodemailer-mailgun-transport')

const { Record } = require("../modules/recordsModule");
const { Sensor } = require("../modules/sensorModule");
const { Alert } = require("../modules/alertsModule");

const emailAuth = {
  auth : {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN
  }
}

let transporter = nodemailer.createTransport(nodemailMailGun(emailAuth));

let mailContent={
    from: 'pamuditharajapaksha@gmail.com',
    to: '',
    subject: 'ALERT : Temperature go beyond Threshold Value',
    text: ''
};

router.post("/", async (req, res) => {
  let date = "";
  if (req.body.date) {
    date = new Date(req.body.date).toISOString();
  } else {
    date = new Date().toISOString();
  }

  const sensor = await Sensor.findOne({ sensor_id: req.body.sensor_id }).populate('user');

  if (sensor.threshold_value <= req.body.temperature) {
    console.log("Alert", sensor._id);
    let newAlert = new Alert({
      sensor: sensor._id,
      user: sensor.user,
      timestamp: date,
      temperature: req.body.temperature,
    });
    newAlert.save();

    //send mail
    mailContent.to = sensor.user.email;
    mailContent.text= `
        Dear ${sensor.user.username},

                Sensor ${sensor.sensor_id} Temperature goes beyond Threshold Value

        Temperature - ${req.body.temperature} 
        Threshold Value - ${sensor.threshold_value} 

        Date - ${new Date(date).toLocaleDateString()}
        Time - ${new Date(date).toLocaleTimeString()}
        
        Thank You,
        Best Regards.
        `
    transporter.sendMail(mailContent, function(error, data){

        if(error){
            console.log(`Unable to send mail to ${mailContent.to}`, error);
        }
        else{
            console.log(`Email send successfully to ${mailContent.to}`);                              
        }
    });
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
      console.log("Add Record Error", e);
    });

  return;
});

module.exports = router;
