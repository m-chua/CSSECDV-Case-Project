const review = require('../models/Review')
const responseService = require('../services/responseService.js')
const reviewService = require('../services/reviewService.js')

const createResponse = async (req, res, next) => {
    const { replyText, reviewId } = req.body
    try {
        const response = await responseService.createResponse({replyText, username:req.user.username, ownerId:req.user.id})
        reviewService.addResponseToReview(response._id, reviewId)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const getResponse = async (req, res, next) => {
    try {
        const response = await responseService.getResponseById(req.params.id)
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const updateResponse = async (req, res, next) => {
    try {
        const response = await responseService.updateResponse(req.params.id, {...req.body, date: new Date()})
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const deleteResponse = async (req, res, next) => {
    try {
        const deletedResponse = await responseService.deleteResponse(req.params.id)
        // console.log(deletedResponse._id, req.body)
        reviewService.deleteResponseFromReview(deletedResponse._id, req.body.reviewId)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createResponse,
    getResponse,
    updateResponse,
    deleteResponse
}
