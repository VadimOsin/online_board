const Router = require('express')
const router = new Router()
const userRoutes = require('./userRouter')
const adsRoutes = require('./adsRouter')
const commentsRoutes = require('./commentsRouter')
const boardRoutes = require('./boardRouter')
const archiveRoutes = require('./archiveRouter')

router.use('/user', userRoutes)
router.use('/ads', adsRoutes)
router.use('/comments', commentsRoutes)
router.use('/board', boardRoutes)
router.use('/archive', archiveRoutes)

module.exports = router