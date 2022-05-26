//import dependences
const wrapper = require('../../utilities/wrapper.response.utility');
const repository = require('../../repositories/erp.repository');
const model = require('../../models/city.model');

//create module
const service = {}

service.list = (params, callback) => {
    repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            `StateId = ${params.stateId}`
        ]
    }, (err, data) => callback(wrapper(err, data, false, false)));
};

service.find = (params, callback) => {
    repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            `StateId = ${params.stateId}`,
            `Id = ${params.id}`
        ]
    }, (err, data) => callback(wrapper(err, data, true, true)));
};

//export module
module.exports = service;