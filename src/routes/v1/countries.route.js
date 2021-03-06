//import dependencies
const router = require('express').Router();
const controller = require('../../controllers/v1/countries.controller');

router.get('/', controller.list);
router.get('/:id', controller.find);

//export module
module.exports = router;