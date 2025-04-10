const express = require('express')
const adminController = require('../controllers/adminController.js')
const authMiddleware = require('../middleware/auth.js')
const path = require('path')
const multer = require('multer')

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/admin/') // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname)) // Use original file extension
    }
})

const avatarUpload = multer({ storage: avatarStorage })

const router = express.Router()

router.post('/', avatarUpload.single('admin'), adminController.createAdmin) // Public route
router.post('/login', adminController.loginAdmin) // New route for login
router.get('/:id', authMiddleware, adminController.getAdmin) // Protected route to get a specific admin
router.put('/:id', authMiddleware, avatarUpload.single('admin'), adminController.updateAdmin) // Protected route to update admin data
router.delete('/:id', authMiddleware, adminController.deleteAdmin) // Protected route to delete admin
router.post('/logout', authMiddleware, adminController.logoutAdmin) // Protected route to logout admin
router.get('/check-adminname/:adminname', adminController.checkAdminname)
router.post('/checkToken', adminController.checkToken)
module.exports = router
