const { issues, newAuth } = require('../models')
const jwt = require('jsonwebtoken')

const getIssues = async (req, res, next) => {
    try {
        const allIssues = await issues.findAll()
        res.json(allIssues)

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const createIssue = async (req, res, next) => {
    //the data for the new issue will be taken using a form so figure out how to get that data in req
    // right now just using a json post
    try {
        const issue = req.body
        await issues.create(issue)
        return res.json(issue)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const grantRight = async (req, res, next) => {
    try {
        const issueId = req.params.id;
        const userId = req.user.id;
        const newUserId = req.body.coauthor;
        console.log(userId);
        const thisIssue = await issues.findAll({
            where: {
                id: issueId,
                userId: userId
            }
        })
        if (thisIssue.length === 0) {
            return res.status(400).json({ message: "Issue doesn't exist or not authorized to modify this issue" });
        }
        const newEntry = {
            issueId: issueId,
            userId: newUserId
        }
        await newAuth.create(newEntry)
        return res.json(newEntry)

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const updateIssue = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const oAuthor = await issues.findAll({
        where: {
            id: id,
            userId: userId
        }
    })
    const coAuthor = await newAuth.findAll({
        where: {
            issueId: id,
            userId: userId
        }
    })
    if (oAuthor.length === 0 && coAuthor.length === 0) {
        return res.status(400).json({ message: "Issue doesn't exist or not authorized to modify this issue" });
    }
    try {
        await issues.update(
            { title: req.body.title, status: req.body.status },
            { where: { id: id } }
        )
    } catch (error) {
        return res.status(400).json({ message: "Invalid request" })
    }
    return res.json({ message: "Inserted succesfully" })
}

module.exports = {
    createIssue,
    getIssues,
    updateIssue,
    grantRight
}