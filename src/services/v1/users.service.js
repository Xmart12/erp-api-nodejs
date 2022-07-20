//import dependences
const wrapper = require('../../utilities/wrapper.response.utility');
const repository = require('../../repositories/erp.repository');
const model = require('../../models/user.model');


//create module
const service = {};


//get user
service.list = async (params = null) => {

    //get user list
    var result = await repository.getData({
        table: model.table,
        fields: model.fields,
        where: [ 'Active = 1' ]
    });
    
    //return wrapper response
    return wrapper.auto(result.error, result.data, false, false);
};


//find user by id
service.find = async (params) => {

    //get user by id
    var result = await repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            'Active = 1',
            `UserName = '${params.username}'`
        ]
    });
    
    //return wrapper response
    return wrapper.auto(result.error, result.data, true, true);
};


//create user
service.create = async (body) => {
    
    //validate user
    var validation = model.validation(body);
    
    //verify validation
    if (!validation.validation) {
        return wrapper.badrequest(validation.message);
    }

    //Create user
    var result = await repository.execute({
        procedure: model.insert,
        params: model.params(body, 'yo')
    });
    
    //verify creation result
    if (result.data) {
        return wrapper.created();
    } else {
        return wrapper.error('Cannot create user. ' + result.error);
    }
};


//export module
module.exports = service;