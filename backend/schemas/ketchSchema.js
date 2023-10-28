const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    activity: {
        type: Object,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    photo: {
        type: Number,
        required: true
    },
    joincode: {
        type: String,
        required: true
    },
    preference: {
        type: Object,
        required: true
    },
    swiped: {
        type: [String],
        required: true
    },
    users: {
        type: [String],
        required: true
    }
},{collection : 'ketch'})

module.exports = mongoose.model('ketch', schema)