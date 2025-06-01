const express = require('express')
const router = express.Router()
const { createIssue, getIssues, updateIssue, grantRight } = require('../controllers/issues')
const authMiddleware = require('../middleware/auth')

router.get('/', authMiddleware, getIssues)

router.post('/', authMiddleware, createIssue)

router.put('/:id', authMiddleware, updateIssue)

router.post('/:id', authMiddleware, grantRight)

module.exports = router