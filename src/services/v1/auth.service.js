//import dependencies
const jwt = require('jsonwebtoken');
const wrapper = require('../../utilities/wrapper.response.utility');
const repository = require('../../repositories/erp.repository');
const model = require('../../models/auth.model');
require('dotenv').config();

//create module
const service = {};

service.login = (body, callback) => {

    var val = model.loginVal(body);

    if (!val.validation) {
        return callback(wrapper.badrequest(val.message));
    }

    repository.execute({
        procedure: model.loginProcedure,
        params: model.loginParams(body)
    }, (err, data) => {
        if (err) { return callback(wrapper.error(err)); }
        
        if (data.length == 0) {
            return callback(wrapper.badrequest('User not found'));
        }

        //get user
        var user = data[0];

        //create token
        var token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name
        }, process.env.SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });

        return callback(wrapper.ok({ token: token }));
    });

};

//export module
module.exports = service;