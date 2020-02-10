const db = require('../database')

const getAllLike = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT id_post, COUNT(id_post) AS total_like FROM `like` GROUP BY id_post ORDER BY id_post ASC')
        res.status(200).json({
            "success": true,
            "data": rows
        })
    } catch (err) {
        next(err)
    }
}

const likePost = async (req, res, next) => {
    const id_user = req.body.id_user
    const id = req.params.id
    try {
        const [post] = await db.query('SELECT * FROM post WHERE id = ?', [id])
        if (!post.length) {
            const error = new Error('Post not found')
            error.statusCode = 404
            next(error)
        }
        const [like] = await db.query('SELECT * FROM `like` WHERE id_post=? AND id_user=?', [id, id_user])
        if (like.length > 1) {
            const error = new Error('Post already liked')
            error.statusCode = 409
            next(error)
        }
        await db.query('INSERT INTO `like`(id_user, id_post) VALUES(?, ?)', [id_user, id])
        res.status(200).json({
            "success": true,
            "message": "liked"
        })
    } catch (error) {
        console.log(error);
        error.message = 'Internal Server Error';
        next(error)
    }
}

const dislikePost = async (req, res, next) => {
    const id_user = req.body.id_user
    const id = req.params.id
    try {
        const [post] = await db.query('SELECT * FROM post WHERE id = ?', [id])
        if (!post.length) {
            const error = new Error('Post not found')
            error.statusCode = 404
            next(error)
        }
        const [like] = await db.query('SELECT * FROM `like` WHERE id_post=? AND id_user=?', [id, id_user])
        if (like.length === 0) {
            const error = new Error('Post already disliked')
            error.statusCode = 409
            next(error)
        }
        await db.query('DELETE FROM `like` WHERE id_user=? AND id_post', [id_user, id])
        res.status(200).json({
            "success": true,
            "message": "disliked"
        })
    } catch (error) {
        console.log(error);
        error.message = 'Internal Server Error';
        next(error)
    }
}

const likeController = { getAllLike, likePost, dislikePost }

module.exports = likeController