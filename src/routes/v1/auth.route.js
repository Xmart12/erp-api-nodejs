//import dependences
const router = require('express').Router();
const controller = require('../../controllers/v1/auth.controller');

router.post('/', controller.login);

//export module
module.exports = router;