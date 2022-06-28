//import dependences
const service = require('../../services/v1/users.service');
const response = require('../../utilities/response.utility');

//create module
const controller = {};

//get all users
controller.list = (req, res) => service.list(req.params, (wrapper) => response(res, wrapper));

//get user by id
controller.find = (req, res) => service.find(req.params, (wrapper) => response(res, wrapper));

//create user
controller.create = (req, res) => service.create(req.body, (wrapper) => response(res, wrapper));

//export module
module.exports = controller;