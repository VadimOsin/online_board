const Router = require('express')
const router = new Router()
const commentsController = require('../controllers/commentsController')


router.get('/:id', commentsController.commentGetOne)
router.post('/', commentsController.commentCreate)
router.put('/:id', commentsController.commentUpdate)
router.delete('/:id', commentsController.commentDelete)


module.exports = router