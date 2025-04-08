const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    rating: { type: Number, min: 1, max: 5, required: true }, // Rating from 1 to 5
    review: { type: String, required: true }, // Content of the review
    media: { type: [String] }, // Optional field for media (e.g., image URL)
    replies: { type: [Schema.Types.ObjectId], ref: 'response', default: [] },
    username: { type: String, required: true }, // Username of the reviewer
    date: { type: Date, default: Date.now }, // Timestamp for when the review was created
    title: { type: String, required: true }, // Title of the review
    isEdited: { type: Date, default: null },
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'restaurant' },

})

module.exports = mongoose.model('Review', reviewSchema)
