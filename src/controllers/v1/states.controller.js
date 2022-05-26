//import dependences
const service = require('../../services/v1/states.service');
const countries = require('../../services/v1/countries.service');
const response = require('../../utilities/response.utility');

//create module
const controller = {};

//get all states from country
controller.list = (req, res) => {

    //verify country
    countries.find({ id: req.params.countryId }, (wrapper) => {
        //verify response
        if (wrapper.statusCode != 200) {
            return response(res, wrapper);
        }
        
        //get list states from country service
        return service.list(req.params, (wrapper) => response(res, wrapper));
    });
};

//get state by id from country
controller.find = (req, res) => {
    
    //verify country
    countries.find({ id: req.params.countryId }, (wrapper) => {
        //verify response
        if (wrapper.statusCode != 200) {
            return response(res, wrapper);
        }

        //find state from country by id
        return service.find(req.params, (wrapper) => response(res, wrapper));
    });
};

//export module
module.exports = controller;