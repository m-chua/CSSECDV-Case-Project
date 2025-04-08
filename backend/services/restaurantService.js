const Restaurant = require('../models/Restaurant')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenBlacklist = []

const createRestaurant = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const restaurant = new Restaurant({...data, password: hashedPassword, averageRating: 0.0})
    return await restaurant.save()
}

const getRestaurantById = async (id) => {
    const restaurant =  await Restaurant.findById(id)
      .select('-password -username') 
      .populate({
        path: 'reviews',
        populate: {
          path: 'replies',
          model: 'Response',  
        },
      });
      return restaurant
};

const logoutUser = (token) => {
    tokenBlacklist.push(token)
}

const isTokenBlacklisted = (token) => {
    return tokenBlacklist.includes(token)
}


const authenticateRestaurantUser = async (username, password) => {
    const restaurantUser = await Restaurant.findOne({ username })

    if (!restaurantUser) {
        return null
    }

    const isMatch = await restaurantUser.comparePassword(password)

    if (!isMatch) {
        return null
    }

    return restaurantUser
}

const generateToken = (restaurantUser) => {
    return jwt.sign({ id: restaurantUser._id, username: restaurantUser.name }, process.env.JWT_SECRET, { expiresIn: '1h' })
}


  
const getAllRestaurants = async () => {
    return await Restaurant.find().select('-password -username') // Returns all restaurants
}

const searchRestaurants = async (query) => {
    return await Restaurant.find({
        $or: [{ name: { $regex: query, $options: 'i' } }]
    }).select('-password -username')
}

const updateRestaurant = async (id, data) => {
    return await Restaurant.findByIdAndUpdate(id, data, { new: true })
}

const deleteRestaurant = async (id) => {
    return await Restaurant.findByIdAndDelete(id)
}

const addReviewToRes = async (reviewId, restaurantId) => {
    const restaurant = await Restaurant.findById(restaurantId)
    restaurant.reviews.push(reviewId)
    await restaurant.updateAverageRating();
    await restaurant.save()

    return { message: 'Review successfully associated with the user and restaurant' };

}

const recalculateRating = async (restaurantId) => {
    const restaurant = await Restaurant.findById(restaurantId);
    await restaurant.updateAverageRating();
    await restaurant.save();
}

const deleteReviewFromRes = async (reviewId, restaurantId) => {
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.reviews = restaurant.reviews.filter((id) => id.toString() !== reviewId);
    await restaurant.updateAverageRating();
    await restaurant.save();

    return { message: 'Review successfully removed from the restaurant' };
};


module.exports = {
    createRestaurant,
    getRestaurantById,
    getAllRestaurants,
    searchRestaurants,
    updateRestaurant,
    deleteRestaurant,
    addReviewToRes, 
    deleteReviewFromRes,
    recalculateRating,
    authenticateRestaurantUser,
    generateToken,
    logoutUser,
    isTokenBlacklisted
}
