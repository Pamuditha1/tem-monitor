const express = require('express');
const router = express.Router();

const {Sensor} = require('../modules/sensorModule')

router.post('/', async (req, res) => {

    console.log("req Came", req.body)
    
    let newSensor = new Sensor({
        sensor_id: req.body.sensor_id,
        threshold_value: req.body.threshold_value,
        user: req.body.user
    });

    await newSensor.save();
    
    res.status(200).send("Sensor Successfully Added")
    return
    
});

module.exports = router;

