const db = require('../database')

const getPostById = async (req, res, next) => {
    const id = req.params.id
    const [rows] = await db.query('SELECT * FROM post WHERE id = ?', [id])
    if (rows.length > 0) {
        res.status(200)
        res.json({
            "success": true,
            "user": rows[0]
        })
    } else {
        res.status(404)
        const error = new Error("Content not found")
        next(error)
    }
}

const createPost = async (req, res, next) => {
    const id_user = req.body.id_user
    const content = req.body.content
    try {
        await db.query('INSERT INTO post(id_user, content) VALUES(?, ?)', [id_user, content])
        res.status(200).json({
            "success": true,
            "message": "Content posted succesfuly"
        })
    } catch (err) {
        console.log(err)
        err.message('Internal Server Error')
        next(err)
    }

}

const updatePost = async (req, res, next) => {
    const id_user = req.body.id_user
    const id = req.params.id
    const newContent = req.body.content
    try {
        await db.query('UPDATE post SET content = ? WHERE id = ? AND id_user=?', [newContent, id, id_user])
        res.status(200).json({
            "success": true,
            "message": "updates successfuly"
        })
    } catch (err) {
        console.log(err)
        err.message('Internal Server Error')
        next(err)
    }
}

const deletePost = async (req, res, next) => {
    const id_user = req.body.id_user
    const id = req.params.id
    try {
        await db.query('DELETE FROM post WHERE id = ? AND id_user=?', [id, id_user])
        res.status(200).json({
            "success": true,
            "message": "deleted successfuly"
        })
    } catch (err) {
        console.log(err)
        err.message('Internal Server Error')
        next(err)
    }

}

const postController = { getPostById, createPost, updatePost, deletePost }

module.exports = postController