const mongoose = require('mongoose');

const constants = require('../constant')
const {Schema} = require('mongoose')

const dosageSchema = new mongoose.Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    center: {
        type: Schema.Types.ObjectId,
        ref: "Center"
    },
    vaccine_name: {
        type: String,
        enum: constants.vaccine_names
    },
    dosage_name: {
        type: String,
        enum: constants.dosage_names
    },
    appointment_time: {
        type: Date,
        required: true
    },
    appointment_status: {
        type: String,
        enum: ['active', 'cancelled', 'completed'],
        default: 'active'
    },
    vaccination_done: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("Dosage", dosageSchema);
