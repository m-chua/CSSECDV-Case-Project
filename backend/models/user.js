const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordAge: { type: Date, default: Date.now },
    cuisines: { type: [String], required: true },
    avatar: { type: String, default: 'default-avatar-url.png' },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', default: [] }],

    attemptsSinceLastLogin: {type: Number, default:0},
    accDisable: { type: Date, default: null },
    lastLogin: { type: Date, default: Date.now }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    const match = await bcrypt.compare(candidatePassword, this.password)
    return match
}

module.exports = mongoose.model('User', userSchema)
