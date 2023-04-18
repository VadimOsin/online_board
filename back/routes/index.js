const Router = require('express')
const router = new Router()
const userRoutes = require('./userRouter')
const adsRoutes = require('./adsRouter')

router.use('/user', userRoutes)
router.use('/ads', adsRoutes)

module.exports = router