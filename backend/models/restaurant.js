const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    name: { type: String, required: true, unique: true },
    cuisine: { type: [String], required: true },
    averageRating: { type: Number, min: 0, max: 5 },
    averageCost: { type: Number, required: true },
    media: { type: String, required: true },
    description: { type: String, required: true },
    amenities: { type: [Number], required: true },

    address: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, required: true },
    hours: { type: String, required: true },


    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', default: [] }],
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

restaurantSchema.methods.comparePassword = async function (candidatePassword) {
    const match = await bcrypt.compare(candidatePassword, this.password)
    return match
}


restaurantSchema.methods.updateAverageRating = async function () {
    console.log("HEREHREHHERE")
    if (this.reviews.length > 0) {
        const reviews = await mongoose.model('Review').find({ _id: { $in: this.reviews } });
        const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = totalRatings / reviews.length;
    } else {
        this.averageRating = 0; // Default to 0 if there are no reviews
    }
    await this.save();
};


module.exports = mongoose.model('Restaurant', restaurantSchema)
