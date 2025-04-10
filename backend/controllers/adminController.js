const review = require('../models/Review')
const adminService = require('../services/adminService.js')

const extractFilePath = (filePath) => {
    return filePath.split('public\\')[1]
}

const createAdmin = async (req, res, next) => {
    try {
        const adminData = {
            ...req.body,
            avatar: req.file ? extractFilePath(req.file.path) : null
        }

        const admin = await adminService.createAdmin(adminData)
        res.status(201).json(admin)
    } catch (error) {
        next(error)
    }
}

const loginAdmin = async (req, res, next) => {
    try {
        const { adminname, password } = req.body
        const admin = await adminService.authenticateAdmin(adminname, password)

        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = await adminService.generateToken(admin)
        res.json({ token, adminId: admin.id })
    } catch (error) {
        next(error)
    }
}

const getAdmin = async (req, res, next) => {
    try {
        const admin = await adminService.getAdminById(req.params.id)

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' })
        }

        res.json({
            _id: admin._id,
            adminname: admin.adminname,
            avatar: admin.avatar
        })
    } catch (error) {
        next(error)
    }
}

const updateAdmin = async (req, res, next) => {
    try {
        const updateData = { ...req.body }

        if (!req.file) {
            delete updateData.avatar
        } else {
            updateData.avatar = extractFilePath(req.file.path)
        }

        const admin = await adminService.updateAdmin(req.params.id, updateData)
        res.json(admin)
    } catch (error) {
        next(error)
    }
}

const deleteAdmin = async (req, res, next) => {
    try {
        await adminService.deleteAdmin(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

const logoutAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(400).json({ message: 'No token provided' })

        await adminService.logoutAdmin(token)
        res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        next(error)
    }
}

const checkAdminname = async (req, res) => {
    const { adminname } = req.params

    try {
        const admin = await adminService.checkAdminname(adminname)
        if (admin) {
            return res.status(200).json({ exists: true })
        }
        return res.status(200).json({ exists: false })
    } catch (error) {
        console.error('Error checking adminname:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

const checkToken = (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1] // Get token from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' })
    }


    try {
        adminService.checkTokenValidity(token);
        res.status(200).json({ message: 'Token is valid' })
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Token has expired or is invalid.' })
    }
}

module.exports = {
    createAdmin,
    loginAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    logoutAdmin,
    checkAdminname,
    checkToken
}
