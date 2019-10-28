const router = require('express').Router();
const controller = require('./controller');

router.get('/all', controller.getAllMessages);
router.get('/:id', controller.getMessage);
router.post('/', controller.addMessage);

module.exports = router;
