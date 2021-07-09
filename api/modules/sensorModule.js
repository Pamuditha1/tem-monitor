const mongoose = require('mongoose');

const Sensor = mongoose.model('Sensor', new mongoose.Schema({
    sensor_id: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    threshold_value : {
        type: String,
        required: true
    },
}));

exports.Sensor = Sensor;
