const mongoose = require("mongoose")
const ketchSchema = require("./ketchSchema")
const crypto = require('crypto')

const makeSalt = () => Math.round(new Date().valueOf() * Math.random()) + "";

const encryptPassword = (salt, password) =>
  crypto.createHmac("sha512", salt).update(password).digest("hex");



const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    streak: {
        type: Number,
        required: true
    },
    ketches: {
        type: [String],
        required: true
    },
    notification: {
        type: [String],
        required: true
    }
},{collection : 'user'})

schema.method("setPassword", function (password) {
    this.salt = makeSalt();
    this.hash = encryptPassword(this.salt, password);
  });
  
schema.method("authenticate", function (plainText) {
    return encryptPassword(this.salt, plainText) === this.hash;
});

// module.exports = mongoose.model('metadata', schema)
module.exports = mongoose.model('user', schema)