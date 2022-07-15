//import dependences
const jwt = require('jsonwebtoken');
const wrapper = require('../utilities/wrapper.response.utility');
const response = require('../utilities/response.utility');
const user = require('../services/v1/users.service');
require('dotenv').config();


/**
 * verify token send in request
 * @param {Object} req Http request object
 * @returns Authorization token 
 */
const verifyToken = (req) => {
    var token = null;

    //get authorization header
    var bearerHeader = req.headers['authorization'];
  
    //verify header
    if (bearerHeader) {
        //split header
        var bearer = bearerHeader.split(' ');  
        if (bearer.length > 1) {
            //get token
            token = bearer[1];
        }
    }

    //return token
    return token;
};

//create module
const middleware = {};

//validate authorization in routes
middleware.auth = (req, res, next) => {
    
    //get token
    var token = verifyToken(req);

    //verify token
    if (!token) {
        return response(res, wrapper.unauthorized());
    }

    try {

        //decoded token
        var decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded.username);

        //send username to request parameters
        req.username = decoded.username;

        //find user by username service
        user.find({ username: req.username }, (wpr) => {

            console.log(wpr);

            //if services gets error
            if (wpr.statusCode > 500) {
                return response(res, wrapper.error(wrp.data.message));
            }

            //if user not found
            if (wpr.statusCode != 200 || wpr.data.length == 0) {
                return response(res, wrapper.unauthorized());
            }

            //return next method
            next();
        });

    } catch (ex) {
        return response(res, wrapper.unauthorized(ex.message));
    }
};

//export module
module.exports = middleware;