const { users } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const getUsers = async (req, res) => {
    try {
        const allUsers = await users.findAll({})
        return res.json({ msg: `Hello there! ${req.user.name}`, allUsers })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Provide all details" })
        }
        const doesExist = await users.findOne({ where: { email: email } });
        if (doesExist) {
            return res.status(409).json({ message: "User with this email id already exists" });
        }
        const user = await users.create(req.body);
        const id = user.id;
        const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '24h' })

        return res.status(200).json({ msg: 'user-created', token });
        //return res.json({ email: email, password: password })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports = {
    getUsers,
    createUser
}