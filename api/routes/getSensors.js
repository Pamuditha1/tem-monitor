const express = require('express');
const router = express.Router();

const {Sensor} = require('../modules/sensorModule')

router.get('/:id',  async (req, res) => {

    const sensors = await Sensor.find({user: req.params.id})
    .populate('user', '-password')
    
    res.status(200).send(sensors)
});

module.exports = router;

