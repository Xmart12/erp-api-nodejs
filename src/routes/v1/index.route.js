//import dependences
const express = require('express');

//export function 
module.exports = (app) => {

    var prefix = '/api/v1';

    //routes
    app.use(prefix, require('./countries.route'));
    app.use(prefix, require('./states.route'));
    app.use(prefix, require('./cities.route'));
};