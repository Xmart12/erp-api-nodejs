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
middleware.auth = async (req, res, next) => {
    
    //get token
    var token = verifyToken(req);

    //verify token
    if (!token) {
        return response(res, wrapper.unauthorized());
    }

    try {

        //decoded token
        var decoded = jwt.verify(token, process.env.SECRET);

        //send username to request parameters
        req.username = decoded.username;

        //find user by username service
        var result = await user.find({ username: req.username });

        //if services gets error
        if (result.statusCode > 500) {
            return response(res, wrapper.error(result.data.message));
        }

        //if user not found
        if (result.statusCode != 200 || result.data.length == 0) {
            return response(res, wrapper.unauthorized());
        }

        //return next method
        next();

    } catch (ex) {
        return response(res, wrapper.unauthorized(ex.message));
    }
};


//validate if user is admin
middleware.isAdmin = async (req, res, next) => {

    var result = await user.roles({ username: req.username });

    //if services gets error
    if (result.statusCode > 500) {
        return response(res, wrapper.error(result.data.message));
    }

    //if user not found
    if (result.statusCode != 200 || result.data.length == 0) {
        return response(res, wrapper.unauthorized());
    }

    //get roles data
    var roles = result.data;
    
    //search for admin role
    var admin = roles.find(f => f.name === 'Admin');

    //verify if user has admin role
    if (!admin) {
        return response(res, wrapper.forbidden());
    }

    next();
    return;
}


//export module
module.exports = middleware;