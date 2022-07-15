//import dependencies
const mysql = require('mysql');
const camelcase = require('camelcase-keys');

//Connection variables
let conn = null;
let dbconfig = null;
let data = null;



/**
 * Send error by Error Code
 * @param {Object} error Error object
 * @returns Error Message
 */
const getError = (error) => {
    var errorMsg = null;

    if (error.code == 'ECONNREFUSED' || error.code == 'ER_ACCESS_DENIED_ERROR') {
        errorMsg = "Cannot establish database connection";
    } else {
        errorMsg = error.code + ' Fail getting database data'
    }

    return errorMsg;
};


/**
 * Execute query method
 * @param {string} sql SQL query string
 * @param {Function} callback Function to execute after Query
 * @param {Boolean} write 
 */
const executeQuery = (sql, callback, write = false) => {

    //create connection
    conn = mysql.createConnection(dbconfig);

    //establishing connection
    conn.connect();

    let foo;

    //Execute query
    foo = conn.query(sql, (err, res) => {
        data = res;
    
        //If error exists
        if (err) {
            callback(getError(err), null);;
        }
        else {
            //Send result
            if (write) {
                callback(null, (res.affectedRows > 0));
            } else {
                callback(null, camelcase(res));
            }
            
        }
    
        //destroy connection
        conn.destroy();

        return res;
    });

    console.log(foo.sql);
};



//Create module
const connection = {};



/**
 * Connect to database
 * @param {object} config Config object from DB
 */
connection.connect = (config) => {
    dbconfig = config;
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
    executeQuery(sqlQuery, callback, false);;
};


/**
 * Insert Data to DB Method
 * @param {object} queryData Object with the params of SQL Query
 * @param {function} callback Function to execute after result
 */
connection.insert = (queryData, callback) => {

    //set fields and values
    var fields = camelcase(Object.keys(queryData.data));
    var values = [];
    fields.forEach(f => {
        if (typeof queryData.data[f] === 'boolean') {
            values.push(queryData.data[f] ? 1 : 0);
        } else {
            values.push(`'${queryData.data[f]}'`);
        }
    });
    
    //set SQL query
    var sqlQuery = 'insert into ' + queryData.table + ' ';
    //Fields
    sqlQuery += ` ( ${fields.join(', ')} ) `;
    //Values
    sqlQuery += ` values ( ${values.join(', ')} ) `;

    //execute query
    executeQuery(sqlQuery, callback, true);
}


/**
 * Execute Stored Procedure in DB Method
 * @param {object} queryData Object with the params of SQL Query
 * @param {function} callback Function to execute after result
 */
connection.execute = (queryData, callback) => {
    
    var values = [];
    queryData.params.forEach(p => {
        if (typeof p === 'boolean') {
            values.push(p ? 1 : 0);
        } else {
            values.push(`'${p}'`);
        }
    });

    //set SQL query
    var sqlQuery = 'call ' + queryData.procedure + ' ';
    sqlQuery += ` ( ${values.join(', ')} ) `;

    //execute query
    executeQuery(sqlQuery, callback, queryData.noData);
}


//export Module
module.exports = connection;