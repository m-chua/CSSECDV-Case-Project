const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'logo.png' },
    
    attemptsSinceLastLogin: {type: Number, default:0},
    accDisable: { type: Date, default: null },
    lastLogin: { type: Date, default: Date.now }
})

adminSchema.methods.comparePassword = async function (candidatePassword) {
    const match = await bcrypt.compare(candidatePassword, this.password)
    return match
}

module.exports = mongoose.model('Admin', adminSchema)
