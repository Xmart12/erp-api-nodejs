//import dependences
const wrapper = require('../../utilities/wrapper.response.utility');
const repository = require('../../repositories/erp.repository');
const model = require('../../models/state.model');

//create module
const service = {}

service.list = (params, callback) => {
    repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            `CountryId = ${params.countryId}`
        ]
    }, (err, data) => callback(wrapper.auto(err, data, false, false)));
};

service.find = (params, callback) => {
    repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            `CountryId = ${params.countryId}`,
            `Id = ${params.id}`
        ]
    }, (err, data) => callback(wrapper.auto(err, data, true, true)));
};

//export module
module.exports = service;