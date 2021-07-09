const mongoose = require('mongoose');

const Record = mongoose.model('Record', new mongoose.Schema({
    sensor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sensor",
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    temperature: {
        type: String,
        required: true
    }

}));

exports.Record = Record;
