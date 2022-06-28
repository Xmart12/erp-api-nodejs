//export function 
module.exports = (app) => {

    var prefix = '/api/v1';

    //routes
    app.use(prefix.concat('/countries'), require('./countries.route'));
    app.use(prefix, require('./states.route'));
    app.use(prefix, require('./cities.route'));
    app.use(prefix.concat('/users'), require('./users.route'));

};