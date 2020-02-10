const router = require('express').Router()
const userRouter = require('./UserRouter')
const postRouter = require('./PostRouter')
const likeRouter = require('./LikeRouter')
const commentRouter = require('./CommentRouter')
const { checkToken } = require('../middleware')

router.get('/', (req, res) => {
    res.send("Hello Mas!")
})

router.use('/user', userRouter)
router.use('/post', checkToken, postRouter)
router.use('/like', checkToken, likeRouter)
router.use('/comment', checkToken, commentRouter)

router.use(notFound)
router.use(errorHandler)

function notFound(req, res, next) {
    res.status(404)
    const err = new Error("Page not found")
    next(err)
}

function errorHandler(err, req, res) {
    res.status(res.statusCode || 500)
    const msg = err.message || "Internal server error"
    res.json({
        "message": msg
    })
}

module.exports = router