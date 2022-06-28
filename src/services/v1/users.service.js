//import dependences
const wrapper = require('../../utilities/wrapper.response.utility');
const repository = require('../../repositories/erp.repository');
const model = require('../../models/user.model');

//create module
const service = {};

//get user
service.list = (params, callback) => {
    repository.getData({
        table: model.table,
        fields: model.fields,
        where: [ 'Active = 1' ]
    }, (err, data) => callback(wrapper.auto(err, data, false, false)));
};

//find user by id
service.find = (params, callback) => {
    repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            'Active = 1',
            `Id = ${params.id}`
        ]
    }, (err, data) => callback(wrapper.auto(err, data, true, true)));
};

//create user
service.create = (body, callback) => {
    
    //validate user
    var validation = model.validation(body);
    
    if (!validation.validation) {
        return callback(wrapper.badrequest(validation.message));
    }

    //Create user
    repository.execute({
        procedure: model.insert,
        params: model.params(body, 'yo')
    }, (err, result) => {
        if (result) {
            callback(wrapper.created());
        } else {
            callback(wrapper.error('No se pudo crear usuario. ' + err));
        }
    });
};

//export module
module.exports = service;