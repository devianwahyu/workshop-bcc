const db = require('../database')

const createComment = async (req, res, next) => {
    const id_user = req.body.id_user
    const id = req.params.id
    const content = req.body.content
    try {
        const [checkPost] = await db.query('SELECT * FROM `post` WHERE id=?', [id])
        if (!checkPost.length) {
            const error = new Error('Post not found')
            error.statusCode = 404
            next(error)
        }
        await db.query('INSERT INTO `comment`(id_user, id_post, content) VALUES(?,?,?)', [id_user, id, content])
        res.status(200).json({
            "success": true,
            "message": "Comment submitted"
        })
    } catch (error) {
        console.log(error)
        error.message('Internal server error')
        next(error)
    }
}

const getCommentById = async (req, res, next) => {
    const id = req.params.id
    try {
        const [checkComment] = await db.query('SELECT * FROM `comment` WHERE id_post = ?', [id])
        if (!checkComment.length) {
            const error = new Error('Comment not found')
            error.statusCode = 404
            next(error)
        }
        res.status(200).json({
            "success": true,
            "data": checkComment
        })
    } catch (error) {
        console.log(error)
        error.message('Internal server error')
        next(error)
    }

}

const editCommentById = async (req, res, next) => {
    const id_user = req.body.id_user
    const id_comment = req.body.id_comment
    const newComment = req.body.comment
    const id = req.params.id
    try {
        const [checkComment] = await db.query('SELECT * FROM `comment` WHERE id_post = ? AND id = ? AND id_user = ?', [id, id_comment, id_user])
        if (checkComment.length === 0) {
            const error = new Error('Comment not found')
            error.statusCode = 404
            next(error)
        }
        await db.query('UPDATE `comment` SET content=? WHERE id_user=? AND id=? AND id_post=?', [newComment, id_user, id_comment, id])
        res.status(200).json({
            "success": true,
            "message": "Edited successfuly"
        })
    } catch (error) {
        console.log(error)
        error.message('Internal server error')
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    const id_user = req.body.id_user
    const id_comment = req.body.id_comment
    const id = req.params.id
    try {
        const [checkComment] = await db.query('SELECT * FROM `comment` WHERE id = ? AND id_user = ? AND id_post = ?', [id_comment, id_user, id])
        if (checkComment.length === 0) {
            const error = new Error('Comment not found')
            error.statusCode = 404
            next(error)
        }
        await db.query('DELETE FROM `comment` WHERE id = ? AND id_user = ? AND id_post = ?', [id_comment, id_user, id])
        res.status(200).json({
            "success": true,
            "message": "deleted successfuly"
        })
    } catch (error) {
        console.log(error)
        error.message('Internal server error')
        next(error)
    }
}

const commentController = { createComment, getCommentById, editCommentById, deleteComment }

module.exports = commentController