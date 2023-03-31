const mongoose = require('mongoose')
const {Schema} = require("mongoose");

module.exports = mongoose.model("Mealcount",
    new Schema({
        _id: {
            type: Schema.ObjectId,
            auto: true
        },
        month: {
            type: Schema.Types.ObjectId,
            ref: 'Month',
            default: null
        },
        user:{
            type:String
        },
        count: {
            type: Number,
            default:0
        },
        created: {
            type: Date,
            default: Date.now
        }
    }))