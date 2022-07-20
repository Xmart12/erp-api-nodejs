//import dependencies
const jwt = require('jsonwebtoken');
const wrapper = require('../../utilities/wrapper.response.utility');
const repository = require('../../repositories/erp.repository');
const model = require('../../models/auth.model');
require('dotenv').config();


//create module
const service = {};


//verify user login
service.login = async (body) => {

    //validate model in body
    var val = model.loginVal(body);

    //verify validation
    if (!val.validation) {
        return wrapper.badrequest(val.message);
    }

    //verify login user
    var result = await repository.execute({
        procedure: model.loginProcedure,
        params: model.loginParams(body)
    });

    //verify if validation gets error
    if (result.error) { return wrapper.error(result.error); }
        
    //verify if validation returns data result
    if (result.data[0][0].length == 0) {
        return wrapper.badrequest('User not found');
    }

    //get user data
    var user = result.data[0][0];

    //create token
    var token = jwt.sign({
        id: user.id,
        username: user.userName,
        email: user.email,
        name: user.name
    }, process.env.SECRET, {
        expiresIn: (process.env.JWT_EXPIRES + 'h')
    });

    //return wrapper response
    return wrapper.ok({ token: token });
};


//export module
module.exports = service;