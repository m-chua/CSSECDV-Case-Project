const express = require('express')
const userRoutes = require('./userRoutes.js')
const restaurantRoutes = require('./restaurantRoutes.js')
const reviewRoutes = require('./reviewRoutes.js')
const responseRoutes = require('./responseRoutes.js')
const cors = require('cors')
const path = require('path')

const app = express()

app.use((req, res, next) => {
    console.log(`${req.method} request made to: ${req.originalUrl}`);
    next();  // Pass control to the next middleware/route handler
});

app.use(express.json())
app.use(
    cors({
        origin: true, // Your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        credentials: true // Allow cookies to be sent with requests
    })
)

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))
app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/responses', responseRoutes)

module.exports = app
