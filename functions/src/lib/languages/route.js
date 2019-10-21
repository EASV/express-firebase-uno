const router = require('express').Router();
const controller = require('./controller');

router.get('/all', controller.getAllLanguages);
router.get('/:language', controller.getLanguage);
router.post('/', controller.addLanguage);
router.put('/', controller.updateLanguage);
router.delete('/:language', controller.deleteLanguage)

module.exports = router;
