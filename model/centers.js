const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    center_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    timing: {
        type: {
            start: Date,
            end: Date,
        },
        required: true
    }
});

module.exports = mongoose.model("Centers", centerSchema);
