const Router = require('express')
const router = new Router()
const archiveController = require('../controllers/archiveController')


router.get('/', archiveController.archiveGetAll)
router.post('/:id', archiveController.archiveAddAds)
router.delete('/:id', archiveController.archiveDeleteAds)


module.exports = router