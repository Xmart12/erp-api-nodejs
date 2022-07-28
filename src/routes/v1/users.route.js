//import dependences
const router = require('express').Router();
const controller = require('../../controllers/v1/users.controller');
const authorization = require('../../middlewares/auth.middleware');

router.get('/', [ authorization.auth ], controller.list);
router.get('/:username', [ authorization.auth, authorization.isAdmin ], controller.find);
router.get('/:username/roles', [ authorization.auth ], controller.roles);
router.post('/', [ authorization.auth ], controller.create);

//export module
module.exports = router;