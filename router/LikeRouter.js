const router = require('express').Router()
const likeController = require('../controller/LikeController')

// GET all likes
router.get('/', likeController.getAllLike)

// Like a post
router.post('/:id', likeController.likePost)

// Dislike a post
router.delete('/:id', likeController.dislikePost)

module.exports = router