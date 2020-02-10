const router = require('express').Router()
const commentController = require('../controller/CommentController')

// POST comment by id_post
router.post('/:id', commentController.createComment)

// GET comment by id_post
router.get('/:id', commentController.getCommentById)

// PUT comment by id
router.put('/:id', commentController.editCommentById)

// DELETE comment by id
router.delete('/:id', commentController.deleteComment)

module.exports = router