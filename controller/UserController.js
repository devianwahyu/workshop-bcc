require('dotenv').config()
const db = require('../database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

const getAllUser = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM user')
        res.json({
            "success": true,
            "data": rows
        })
    } catch (err) {
        next()
    }
}

const registerUser = async (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    try {
        const [checkEmail] = await db.query('SELECT * FROM `user` WHERE `email` = ? LIMIT 1', [email])
        if (checkEmail.length > 0) {
            const error = new Error('Email already registered')
            error.statusCode = 409
            next(error)
        }
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 11)
        db.query('INSERT INTO `user`(name, email, password) VALUES(?,?,?)', [name, email, hashedPassword])
        res.status(200).json({
            "success": true,
            "message": 'registered successfuly'
        })
    } catch (error) {
        console.log(error)
        error.message('Internal server error')
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    const email = req.body.email
    try {
        const [checkEmail] = await db.query('SELECT * FROM `user` WHERE `email` = ?', [email])
        if (checkEmail.length === 0) {
            const error = new Error('Email belum terdaftar')
            error.statusCode = 404
            next(error)
        }
        const user = checkEmail[0]
        const password = req.body.password
        bcrypt.compare(password, user.password)
        const payload = {
            "id_user": user.id,
            "email": user.email
        }
        const token = await jwt.sign(payload, JWT_KEY)
        if (token) {
            res.status(200).json({
                "success": true,
                "token": token
            })
        } else {
            const error = new Error("JWT Error, can't create token")
            next(error)
        }
    } catch (error) {
        console.log(error)
        error.message('Internal server error')
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    const id = req.params.id
    const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [id])
    if (rows.length > 0) {
        res.json({
            "success": true,
            "user": rows[0]
        })
    } else {
        res.status(404)
        const error = new Error("User not found")
        next(error)
    }
}

const updateUserName = (req, res, next) => {
    const id = req.params.id
    const newName = req.body.name
    db.query('UPDATE user SET name = ? WHERE id = ?', [newName, id])
        .then(() => {
            res.json({
                "success": true,
                "message": "Updated successfuly"
            })
        })
        .catch((err) => {
            next(err)
        })
}

const userController = { getAllUser, registerUser, getUserById, updateUserName, loginUser }

module.exports = userController