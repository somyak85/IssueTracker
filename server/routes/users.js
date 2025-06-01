const express = require('express')
const router = express.Router()
const { getUsers, createUser } = require('../controllers/users')
const authMiddleware = require('../middleware/auth')

router.route('/').get(authMiddleware, getUsers)

router.route('/').post(createUser)

module.exports = router