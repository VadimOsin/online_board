const Router = require('express')
const router = new Router()
const adsController = require('../controllers/adsController')


router.get('/:id', adsController.adsGetOne)
router.post('/', adsController.adsCreate)
router.put('/:id', adsController.adsUpdate)
router.delete('/:id', adsController.adsDelete)


module.exports = router