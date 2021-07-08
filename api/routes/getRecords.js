const express = require('express');
const router = express.Router();

const {Sensor} = require('../modules/sensorModule')
const {Record} = require('../modules/recordsModule')

router.get('/:id',  async (req, res) => {

    const records = await Record.find({sensor: req.params.id})
    .sort({timestamp: 'asc'})
    .populate('sensor')
    
    res.status(200).send(records)
});

module.exports = router;

