//import dependences
const service = require('../../services/v1/countries.service');
const response = require('../../utilities/response.utility');

//create module
const controller = {}

//get all countries
controller.list = (req, res) => service.list(null, (wrapper) => response(res, wrapper));

//get country by id
controller.find = (req, res) => service.find(req.params, (wrapper) => response(res, wrapper));

//export module
module.exports = controller;