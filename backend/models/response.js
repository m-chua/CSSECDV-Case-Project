const mongoose = require('mongoose')
const Schema = mongoose.Schema

const responseSchema = new Schema({
    username: { type: String, required: true }, // Username of the person replying
    replyText: { type: String, required: true }, // Content of the reply
    date: { type: Date, default: Date.now }, // Timestamp for when the reply was made
    ownerId: { type: Schema.Types.ObjectId }
})

module.exports = mongoose.model('Response', responseSchema)
