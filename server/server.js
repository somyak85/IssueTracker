const express = require('express');
const app = express();
const cors = require("cors")

//database
const db = require('./models')

//routes
const posts = require('./routes/posts')
const issues = require('./routes/issues')
const users = require('./routes/users')


//middlewares

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
//need to create custom handling errors middleware

const PORT = 5000
app.use("/api/v1/issue", posts)
app.use("/api/v1/home", issues)
app.use("/api/v1/users", users)
app.get('*', (req, res) => {
    res.status(404).send("Oops, not a valid link m8")
})

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
})
