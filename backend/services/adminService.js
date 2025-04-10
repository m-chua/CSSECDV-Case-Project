const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenBlacklist = []

const createAdmin = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const admin = new Admin({ ...data, password: hashedPassword })
    return await admin.save()
}

const getAdminById = async (id) => {
    return await Admin.findById(id)
        .select('-password')
        .populate({
            path: 'reviews',
            populate: {
              path: 'replies',
              model: 'Response',  
            },
          });
}

const updateAdmin = async (id, data) => {
    // update the password only when correct and needed
    if (data.newPassword) {
        const isPassCorrect = await authenticateAdmin(data.oldUsername, data.password)

        if (isPassCorrect) {
            data.password = await bcrypt.hash(data.newPassword, 10)
        } else {
            delete data.password
        }
    } else {
        delete data.password
    }

    return await Admin.findByIdAndUpdate(id, data, { new: true }).select('-password')
}

const deleteAdmin = async (id) => {
    return await Admin.findByIdAndDelete(id)
}

const generateToken = (admin) => {
    return jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const authenticateAdmin = async (username, password) => {
    const admin = await Admin.findOne({ username })

    if (!admin) {
        return null
    }

    const isMatch = await admin.comparePassword(password)

    if (!isMatch) {
        return null
    }

    return admin
}

const checkTokenValidity = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

const logoutAdmin = (token) => {
    tokenBlacklist.push(token)
}

const isTokenBlacklisted = (token) => {
    return tokenBlacklist.includes(token)
}

const checkUsername = async (username) => {
    return await Admin.findOne({ username })
}

const deleteReviewFromAdmin = async (adminId, reviewId) => {
    const admin = await Admin.findById(adminId)
    
    if (!admin) {
        throw new Error('Admin not found')
    }

    admin.reviews = admin.reviews.filter(review => review._id.toString() !== reviewId.toString())
    await admin.save()

    return admin
}

const addReviewToAdmin = async (adminId, reviewId) => {
    const admin = await Admin.findById(adminId);
    admin.reviews.push(reviewId); 

    await admin.save();

    return { message: 'Review successfully added to admin' };

};


module.exports = {
    createAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    generateToken,
    authenticateAdmin,
    logoutAdmin,
    isTokenBlacklisted,
    checkUsername,
    checkTokenValidity,
    deleteReviewFromAdmin,
    addReviewToAdmin
}
