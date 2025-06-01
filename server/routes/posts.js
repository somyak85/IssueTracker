const express = require('express')
const router = express.Router()
const { getPosts, createPost } = require('../controllers/posts')


router.get('/:id', getPosts)


router.post('/:id', createPost)

module.exports = router