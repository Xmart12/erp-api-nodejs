//import dependences
const service = require('../../services/v1/cities.service');
const countries = require('../../services/v1/countries.service');
const states = require('../../services/v1/states.service');
const response = require('../../utilities/response.utility');


//create module
const controller = {};

//Get all cities from state
controller.list = (req, res) => {
    
    //verify country
    countries.find({ id: req.params.countryId }, (wrapper) => {
        //verify response
        if (wrapper.statusCode != 200) {
            return response(res, wrapper);
        }

        //verify state
        return states.find({ countryId: req.params.countryId, id: req.params.stateId }, (wrapper) => {
            //verify response
            if (wrapper.statusCode != 200) {
                return response(res, wrapper);
            } 

            //get list state cities
            return service.list(req.params, (wrapper) => response(res, wrapper));
        });
    });
};

//get city by id from state
controller.find = (req, res) => {
    
    //verify country
    countries.find({ id: req.params.countryId }, (wrapper) => {
        //verify response
        if (wrapper.statusCode != 200) {
            return response(res, wrapper);
        } 

        //verify state
        return states.find({ countryId: req.params.countryId, id: req.params.stateId }, (wrapper) => {
            //verify response
            if (wrapper.statusCode != 200) {
                return response(res, wrapper);
            } 

            //get list state cities
            return service.find(req.params, (wrapper) => response(res, wrapper));
        });
    });
};

//export module
module.exports = controller;