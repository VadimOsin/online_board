const Router = require('express')
const router = new Router()
const userRoutes = require('./userRouter')
const adsRoutes = require('./adsRouter')
const commentsRoutes = require('./commentsRouter')

router.use('/user', userRoutes)
router.use('/ads', adsRoutes)
router.use('/comments', commentsRoutes)

module.exports = router