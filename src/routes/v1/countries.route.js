//import dependencies
const router = require('express').Router();
const controller = require('../../controllers/v1/countries.controller');

router.get('/countries', controller.list);
router.get('/countries/:id', controller.find);

//export module
module.exports = router;