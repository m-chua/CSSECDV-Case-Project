// routes/restaurantRoutes.js

const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController')
const authMiddleware = require('../middleware/auth.js')
const multer = require('multer')
const path = require('path')


const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/media/') 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname)) // Use original file extension
    }
})

const avatarUpload = multer({ storage: avatarStorage })


router.post('/', avatarUpload.single('media'), restaurantController.createRestaurant)
router.post('/login', restaurantController.loginRestaurantUser) // New route for login
router.post('/logout', authMiddleware, restaurantController.logoutUser) // New route for login

router.get('/search', restaurantController.searchRestaurants)
router.get('/:id', restaurantController.getRestaurant)
router.get('/', restaurantController.getAllRestaurants)
router.put('/:id', restaurantController.updateRestaurant)
router.delete('/:id', restaurantController.deleteRestaurant)

module.exports = router
