//import dependences
const service = require('../../services/v1/auth.service');
const response = require('../../utilities/response.utility');

//create module
const controller = {};

//login
controller.login = (req, res) => service.login(req.body, (wrapper) => response(res, wrapper));

//export module
module.exports = controller;