const express = require('express')
const responseController = require('../controllers/responseController.js')
const authMiddleware = require('../middleware/auth.js')

const router = express.Router()

router.post('/', authMiddleware, responseController.createResponse) // Protected route to create a response
router.get('/:id', responseController.getResponse) // Public route to view a specific response
router.put('/:id', authMiddleware, responseController.updateResponse) // Protected route to update a response
router.delete('/:id', authMiddleware, responseController.deleteResponse) // Protected route to delete a response

module.exports = router
