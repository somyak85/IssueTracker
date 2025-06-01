const { posts } = require('../models')

const getPosts = async (req, res) => {
    try {
        const id = req.params.id
        const allPosts = await posts.findAll({
            where: {
                issueId: id
            }
        })
        res.json(allPosts)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const createPost = async (req, res) => {
    // console.log(req.params)
    // console.log(req.body)
    try {
        const post = req.body
        post.issueId = req.params.id
        await posts.create(post)
        res.json(post)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports = {
    createPost,
    getPosts
}