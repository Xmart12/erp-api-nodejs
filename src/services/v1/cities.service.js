//import dependences
const wrapper = require('../../utilities/wrapper.response.utility');
const repository = require('../../repositories/erp.repository');
const model = require('../../models/city.model');
const countries = require('./countries.service');
const states = require('./states.service');


//create module
const service = {}


//get list of cities by country by state
service.list = async (params) => {

    //get country 
    var country = await countries.find({ id: params.countryId });

    //verify country response
    if (country.statusCode != 200) {
        return country;
    }

    //get state
    var state = await states.find({ 
        countryId: params.countryId,
        id: params.stateId 
    });

    //verify state response
    if (state.statusCode != 200) {
        return state;
    }

    //get state cities list
    var result = await repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            `StateId = ${params.stateId}`
        ]
    });
    
    //return wrapper response
    return wrapper.auto(result.error, result.data, false, false);
};


//get city by country by state by id
service.find = async (params) => {

    //get country 
    var country = await countries.find({ id: params.countryId });

    //verify country response
    if (country.statusCode != 200) {
        return country;
    }

    //get state
    var state = await states.find({ 
        countryId: params.countryId,
        id: params.stateId 
    });

    //verify state response
    if (state.statusCode != 200) {
        return state;
    }

    //get state city
    var result = await repository.getData({
        table: model.table,
        fields: model.fields,
        where: [
            `StateId = ${params.stateId}`,
            `Id = ${params.id}`
        ]
    });
    
    //return wrapper response
    return wrapper.auto(result.error, result.data, true, true);
};


//export module
module.exports = service;