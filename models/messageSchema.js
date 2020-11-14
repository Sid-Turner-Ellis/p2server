const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    name: String,
    contact: String,
    message: String
})

module.exports = mongoose.model('messageModel',messageSchema)