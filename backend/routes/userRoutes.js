const express = require('express')
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/auth.js')
const path = require('path')
const multer = require('multer')

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/avatars/') // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname)) // Use original file extension
    }
})

const avatarUpload = multer({ storage: avatarStorage })

const router = express.Router()

router.post('/', avatarUpload.single('avatar'), userController.createUser) // Public route
router.post('/login', userController.loginUser) // New route for login
router.get('/:id', authMiddleware, userController.getUser) // Protected route to get a specific user
router.put('/:id', authMiddleware, avatarUpload.single('avatar'), userController.updateUser) // Protected route to update user data
router.delete('/:id', authMiddleware, userController.deleteUser) // Protected route to delete user
router.post('/logout', authMiddleware, userController.logoutUser) // Protected route to logout user
router.get('/check-username/:username', userController.checkUsername)
router.post('/checkToken', userController.checkToken)
module.exports = router
