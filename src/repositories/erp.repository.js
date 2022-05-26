//import dependencies
const connection = require('../utilities/mysql.connection.utility');
const { erp } = require('../configs/db.mysql.config');

//Connect to database ERP
connection.connect(erp);

//export module
module.exports = connection;