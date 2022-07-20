//import dependences
const service = require('../../services/v1/cities.service');
const response = require('../../utilities/response.utility');


//create module
const controller = {};

//Get all cities from state
controller.list = async (req, res) => response(res, await service.list(req.params)); 

//get city by id from state
controller.find = async (req, res) => response(res, await service.find(req.params));  

//export module
module.exports = controller;