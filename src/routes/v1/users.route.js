//import dependences
const router = require('express').Router();
const controller = require('../../controllers/v1/users.controller');

router.get('/', controller.list);
router.get('/:id', controller.find);
router.post('/', controller.create);

//export module
module.exports = router;