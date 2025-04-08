// controllers/restaurantController.js

const restaurantService = require('../services/restaurantService')


const extractFilePath = (filePath) => {
    return filePath.split('public\\')[1]
}


const createRestaurant = async (req, res, next) => {
    try {
        const restaurantData = {
            ...req.body,
            media: req.file ? extractFilePath(req.file.path) : null
        }
        restaurantData['cuisine'] = JSON.parse(restaurantData['cuisine'])
        restaurantData['amenities'] = JSON.parse(restaurantData['amenities'])
        
        console.log(restaurantData)
        const restaurant = await restaurantService.createRestaurant(restaurantData)
        res.status(201).json(restaurant)
    } catch (error) {
        next(error)
    }
}

const getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.getRestaurantById(req.params.id)
        res.json(restaurant)
    } catch (error) {
        next(error)
    }
}

const getAllRestaurants = async (req, res, next) => {
    try {
        const restaurants = (await restaurantService.getAllRestaurants()).slice(0, 9)
        res.json(restaurants)
    } catch (error) {
        next(error)
    }
}

const searchRestaurants = async (req, res, next) => {
    try {
        const query = req.query.query
        const restaurants = await restaurantService.searchRestaurants(query)
        const updatedRestaurants = restaurants.map(({ averageRating, averageCost, _id, name, cuisine }) => ({
            _id: _id,
            name: name,
            cuisine: cuisine,
            rating: averageRating,
            avgPrice: averageCost,
        }))
        console.log(updatedRestaurants)
        res.json(updatedRestaurants)
    } catch (error) {
        next(error)
    }
}

const updateRestaurant = async (req, res, next) => {
    try {
        
        const restaurantData = {
            ...req.body,
        }
        restaurantData['cuisine'] = JSON.parse(restaurantData['cuisine'])
        restaurantData['amenities'] = JSON.parse(restaurantData['amenities'])
        
        const restaurant = await restaurantService.updateRestaurant(req.params.id, restaurantData)
        
        res.json(restaurant)
    } catch (error) {
        next(error)
    }
}   

const deleteRestaurant = async (req, res, next) => {
    try {
        await restaurantService.deleteRestaurant(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

const loginRestaurantUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const restaurantUser = await restaurantService.authenticateRestaurantUser(username, password)

        if (!restaurantUser) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = await restaurantService.generateToken(restaurantUser)
        res.json({ token, userId: restaurantUser.id })
    } catch (error) {
        next(error)
    }
}

const logoutUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(400).json({ message: 'No token provided' })

        await restaurantService.logoutUser(token)
        res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createRestaurant,
    getRestaurant,
    getAllRestaurants,
    searchRestaurants,
    updateRestaurant,
    deleteRestaurant,
    loginRestaurantUser,
    logoutUser
}
