const jwt = require('jsonwebtoken')
const userService = require('../services/userService')
const adminService = require('../services/adminService')
const fs = require('fs')


const fileName = "../frontend/public/Logs.txt";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' })

    if (userService.isTokenBlacklisted(token)) {
        return res.status(401).json({ message: 'Token is invalidated' })
    }
    if (adminService.isTokenBlacklisted(token)) {
        return res.status(401).json({ message: 'Token is invalidated' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log(req.user)
        date = new Date().toLocaleString()
        fs.appendFile(fileName, date + " " +JSON.stringify(req.user) + "\n", (err) => {
        
                // In case of a error throw err.
                if (err) throw err;
            })
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token has expired' })
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token is not valid' })
        } else {
            console.error(error)
            res.status(500).json({ message: 'An error occurred during authentication' })
        }
    }
}

module.exports = authMiddleware
