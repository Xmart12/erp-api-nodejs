//import dependences
const service = require('../../services/v1/users.service');
const response = require('../../utilities/response.utility');

//create module
const controller = {};

//get all users
controller.list = async (req, res) => response(res, await service.list());

//get user by id
controller.find = async (req, res) => response(res, await service.find(req.params));

//create user
controller.create = async (req, res) => response(res, await service.create(req.body));

//export module
module.exports = controller;