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


//get user roles
service.roles = async (params) => {

    //get user by id
    var user = await repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            'Active = 1',
            `UserName = '${params.username}'`
        ]
    });

    //verify user data error
    if (user.error) {
        return wrapper.error(user.error);
    }

    //verify user data
    if (user.data.length == 0) {
        return wrapper.notfound('User not found');
    }

    //get roles
    var roles = await repository.getData({
        table: 'UserRoles ur',
        fields: [ 'ur.IdRole', 'r.Name', 'r.Description' ],
        joins: [{
            type: 'inner join',
            table: 'Roles r',
            conditions: [ 'ur.IdRole = r.Id', 'r.Active = 1' ]
        }],
        where: [
            `IdUser = '${user.data[0].id}'`
        ]
    });

    //return wrapper response
    return wrapper.auto(roles.error, roles.data);
}


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