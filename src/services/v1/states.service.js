//import dependences
const wrapper = require('../../utilities/wrapper.response.utility');
const repository = require('../../repositories/erp.repository');
const model = require('../../models/state.model');
const countries = require('./countries.service');


//create module
const service = {}


//get list of states by country
service.list = async (params) => {

    //get country 
    var country = await countries.find({ id: params.countryId });

    //verify country response
    if (country.statusCode != 200) {
        return country;
    }

    //get country states list 
    var result = await repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            `CountryId = ${params.countryId}`
        ]
    });

    //return wrapper response
    return wrapper.auto(result.error, result.data, false, false);
};


//get state by country by id
service.find = async (params) => {

    //get country 
    var country = await countries.find({ id: params.countryId });

    //verify country response
    if (country.statusCode != 200) {
        return country;
    }

    //get country state
    var result = await repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            `CountryId = ${params.countryId}`,
            `Id = ${params.id}`
        ]
    });

    //return wrapper response
    return wrapper.auto(result.error, result.data, true, true)
};


//export module
module.exports = service;