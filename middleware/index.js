require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_TOKEN = process.env.JWT_TOKEN
const checkToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        if (token) {
            jwt.verify(token, JWT_TOKEN, (err, result) => {
                if (err) {
                    res.status(403)
                    const error = new Error("Wrong Token")
                    next(error)
                } else {
                    req.user = result
                    next()
                }
            })
        } else {
            res.status(403)
            const err = new Error("Authorization Token Not Found")
            next(err)
        }
    } else {
        res.status(403)
        const err = new Error("Please Provide Authorization Header")
        next(err)
    }
}

module.exports = { checkToken }