//import dependencies
const router = require('express').Router();
const controller = require('../../controllers/v1/states.controller');

router.get('/countries/:countryId/states', controller.list);
router.get('/countries/:countryId/states/:id', controller.find);

//export module
module.exports = router;