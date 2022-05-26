//import dependencies
const router = require('express').Router();
const controller = require('../../controllers/v1/cities.controller');

router.get('/countries/:countryId/states/:stateId/cities', controller.list);
router.get('/countries/:countryId/states/:stateId/cities/:id', controller.find);

//export module
module.exports = router;