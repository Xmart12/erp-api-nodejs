//import dependences
const service = require('../../services/v1/auth.service');
const response = require('../../utilities/response.utility');

//create module
const controller = {};

//login
controller.login = async (req, res) => response(res, await service.login(req.body));

//export module
module.exports = controller;