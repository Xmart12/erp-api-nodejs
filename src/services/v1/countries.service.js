//import dependences
const wrapper = require('../../utilities/wrapper.response.utility');
const repository = require('../../repositories/erp.repository');
const model = require('../../models/contry.model');


//create module
const service = {};


//get list of countries
service.list = async (params = null) => {
    //get countries
    var result = await repository.getData({
        table: model.table,
        fields: model.fields
    });

    //return wrapper response
    return wrapper.auto(result.error, result.data, false, false);
};


//get country by id
service.find = async (params) => {
    //get country
    var result = await repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            `Id = ${params.id}`
        ]
    });

    //return wrapper response
    return wrapper.auto(result.error, result.data, true, true);
};


//export module
module.exports = service;