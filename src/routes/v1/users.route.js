//import dependences
const router = require('express').Router();
const controller = require('../../controllers/v1/users.controller');
const authorization = require('../../middlewares/auth.middleware');

router.get('/', controller.list);
router.get('/:username', [ authorization.auth ], controller.find);
router.post('/', controller.create);

//export module
module.exports = router;