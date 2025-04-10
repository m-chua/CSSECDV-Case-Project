const review = require('../models/Review')
const Admin = require('../models/admin')
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
        const { username, password } = req.body
        const admin = await adminService.authenticateAdmin(username, password)
        const fs = require("fs");
        const fileName = "Logs.txt";
        const date = new Date().toLocaleString();
        const output = `Login attempt with details: Username: ` + username + " Password: "+password;
        
        fs.appendFile(fileName, date + " " + output + "\n", (err) => {
            if (err)  {
                console.error("Error writing to log file:", err);
                // Handle error appropriately
            }
        });
        console.log(output)
        
        if (!admin) {
            temp = await Admin.findOne({ username })
                        
            if(temp){
                            
                console.log("invalid attempt")
                temp.attemptsSinceLastLogin = temp.attemptsSinceLastLogin + 1
                console.log(temp)
                if(temp.attemptsSinceLastLogin>=5){
                    currentDate = new Date(); // Current date/time
                    futureDate = new Date(currentDate);
                    futureDate.setDate(currentDate.getDate() + 5);
            
                    temp.attemptsSinceLastLogin = 0
                    temp.accDisable = futureDate
                }
                admin.lastLogin = Date.now()
                adminService.updateAdmin(temp.id, temp)
            }
                  
            return res.status(401).json({ message: 'Invalid credentials' })
        }

         //account disable
         if(admin.accDisable!=null){
            
            currentDate = new Date(); 
            if(admin.accDisable < currentDate){
                admin.accDisable = null
                adminService.updateAdmin(admin.id, admin)
            }else {
                return res.status(401).json({ message: 'Too many inavlid attempts. Account disabled. Try again in 5 days.' })
                
            }
        }
        const token = await adminService.generateToken(admin)
        const login = admin.lastLogin
        admin.lastLogin = Date.now()
        adminService.updateAdmin(admin.id, admin)
        res.json({ token, adminId: admin.id , lastLogin: login})
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
            username: admin.username,
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

const checkUsername = async (req, res) => {
    const { username } = req.params

    try {
        const admin = await adminService.checkUsername(username)
        if (admin) {
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
    checkUsername,
    checkToken
}
