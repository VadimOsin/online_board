const Router = require('express')
const router = new Router()
const boardController = require('../controllers/boardController')


router.get('/', boardController.boardGetAll)
router.post('/:id', boardController.boardAddAds)
router.delete('/:id', boardController.boardDeleteAds)


module.exports = router