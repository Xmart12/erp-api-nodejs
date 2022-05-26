//import dependencies
const mysql = require('mysql');
const camelcase = require('camelcase-keys');

//Create Connection
let conn = null;

//Send error by Error Code
const getError = (error) => {
    var errorMsg = null;

    if (error.code == 'ECONNREFUSED' || error.code == 'ER_ACCESS_DENIED_ERROR') {
        errorMsg = "Cannot establish database connection";
    } else {
        errorMsg = 'Fail getting database data'
    }

    return errorMsg;
};

//Execute query method
const executeQuery = (sql, callback) => {

    //Execute query
    return conn.query(sql, (err, res) => {
        //If error exists
        if (err) {
            callback(getError(err), null);;
        }
        else {
            //Send result
            callback(null, camelcase(res));
        }
    })
};


//Create module
const connection = {};

/**
 * Connect to database
 * @param {object} config Config object from DB
 */
connection.connect = (config) => {
    conn = mysql.createConnection(config);
}

/**
 * Get Data from DB Method
 * @param {object} queryData Object with the params of SQL Query
 * @param {function} callback Function to execute after result
 */
connection.getData = (queryData, callback) => {

    //set SQL query
    var sqlQuery = 'select '; 
    //Fields
    sqlQuery += (queryData.fields) ? queryData.fields.join(', ') : ' * ';
    //Table
    sqlQuery += (queryData.table) ? ` from ${queryData.table} ` : '';
    //Join
    if (queryData.joins) {
        queryData.joins.forEach(j => {
            sqlQuery += ` ${j.type} ${j.table} on ${j.conditions.join(' and ')} `;
        });
    }
    //Where
    sqlQuery += (queryData.where) ? ` where ${queryData.where.join(' and ')} ` : '';
    //Group by
    sqlQuery += (queryData.groupby) ? `group by ${queryData.groupby.join(', ')} ` : '';
    //limit
    sqlQuery += (queryData.limit) ? ` limit ${queryData.limit} ` : '';

    //execute query
    executeQuery(sqlQuery, callback);;
};

//Export Module
module.exports = connection;