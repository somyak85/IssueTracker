const { users } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const autheticationMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ msg: "No token provided" });
        }
        const token = authHeader.split(' ')[1];
        console.log(token)
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const curruser = await users.findAll({ where: { id: decoded.id } });
            console.log(curruser[0].name);
            req.user = { id: decoded.id, name: curruser[0].name }
            next()
        } catch (error) {
            return res.status(401).json({ msg: "Not authorized to access this route" })
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports = autheticationMiddleware