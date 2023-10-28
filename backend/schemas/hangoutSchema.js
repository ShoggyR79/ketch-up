const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    }
},{collection : 'hangout'})


// module.exports = mongoose.model('metadata', schema)
module.exports = mongoose.model('hangout', schema)