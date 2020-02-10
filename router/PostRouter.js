const router = require('express').Router()
const postController = require('../controller/PostController')
// const { checkToken } = require('../middleware')

// Get post by id
router.get('/:id', postController.getPostById)

// Post a post
router.post('/', postController.createPost)

// Update a post by id
router.put('/:id', postController.updatePost)

// Delete a post by id
router.delete('/:id', postController.deletePost)

module.exports = router