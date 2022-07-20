//import dependences
const service = require('../../services/v1/states.service');
const response = require('../../utilities/response.utility');

//create module
const controller = {};

//get all states from country
controller.list = async (req, res) => response(res, await service.list(req.params)); 

//get state by id from country
controller.find = async (req, res) => response(res, await service.find(req.params)); 

//export module
module.exports = controller;