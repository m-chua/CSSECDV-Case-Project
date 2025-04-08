const express = require('express')
const reviewController = require('../controllers/reviewController.js')
const authMiddleware = require('../middleware/auth.js')
const path = require('path')
const multer = require('multer')

const mediaStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/media/') // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname)) // Keep the original file extension
    }
})

const mediaUpload = multer({ storage: mediaStorage })

const router = express.Router()

router.post('/:id', authMiddleware,  mediaUpload.array('media', 4), reviewController.createReview)
router.get('/:id', reviewController.getReview)
router.put('/:id', authMiddleware, mediaUpload.array('media', 4), reviewController.updateReview) // Support up to 4 images
router.delete('/:id', authMiddleware, reviewController.deleteReview)

module.exports = router
