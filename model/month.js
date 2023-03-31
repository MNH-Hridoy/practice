const mongoose = require('mongoose')
const {Schema} = require("mongoose");

module.exports = mongoose.model("Month",
    new Schema({
        _id: {
            type: Schema.ObjectId,
            auto: true
        },
        name: String,
        created: {
            type: Date,
            default: Date.now
        },
    }))