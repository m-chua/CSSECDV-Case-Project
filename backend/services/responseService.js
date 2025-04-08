const Response = require('../models/Response')

const createResponse = async (data) => {
    const response = new Response(data)
    return await response.save()
}

const getResponseById = async (id) => {
    return await Response.findById(id)
}

const updateResponse = async (id, data) => {
    return await Response.findByIdAndUpdate(id, data)
}

const deleteResponse = async (id) => {
    return await Response.findByIdAndDelete(id)
}

module.exports = {
    createResponse,
    getResponseById,
    updateResponse,
    deleteResponse
}
