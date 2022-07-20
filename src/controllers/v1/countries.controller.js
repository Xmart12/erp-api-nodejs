//import dependences
const service = require('../../services/v1/countries.service');
const response = require('../../utilities/response.utility');

//create module
const controller = {}

//get all countries
controller.list = async (req, res) => response(res, await service.list());

//get country by id
controller.find = async (req, res) => response(res, await service.find(req.params));

//export module
module.exports = controller;