const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    doses: [{
        type: Schema.Types.ObjectId,
        ref: "Dosage"
    }],
    verfied: {
        type: Boolean,
        default: false,
    },
    isadmin: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("User", userSchema);
