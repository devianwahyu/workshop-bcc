const router = require('express').Router()
const userController = require('../controller/UserController')


// Get all users
router.get('/', userController.getAllUser)

// Register user
router.post('/register', userController.registerUser)

// Get a user
router.get('/:id', userController.getUserById)

//  Update name
router.put('/:id', userController.updateUserName)

// Delete user
router.delete('/')

// Login user
router.post('/login', userController.loginUser)

module.exports = router