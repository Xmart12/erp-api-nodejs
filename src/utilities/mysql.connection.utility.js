//import dependencies
const mysql = require('mysql');
const camelcase = require('camelcase-keys');

//Connection variables
let dbconfig = null;


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
        errorMsg = 'Fail getting database data - ' + error.code;
    }

    console.log(error);

    return errorMsg;
};


/**
 * Get result from query by promise
 * @param {Object} promise Query result promise
 * @returns Object with data and error
 */
const getResult = async (promise) => {
    try {
        return await promise;
    }
    catch (ex) {
        return {
            error: ex.message,
            data: null
        };
    }
};


/**
 * Execute query method
 * @param {string} sql SQL query string
 * @param {Boolean} write Read or Write flag
 * @returns Promise executed
 */
const executeQuery = (sql, write = false) => {

    return new Promise((resolve, reject) => {
        
        //create connection
        var conn = mysql.createConnection(dbconfig);

        //establishing connection
        conn.connect();

        //Execute query
        conn.query(sql, (err, res) => {

            //destroy connection
            conn.destroy();

            //return promise resolve 
            return resolve({
                error: (err) ? getError(err) : null,
                data: (err) ? null : (write) ? (res.affectedRows > 0) : camelcase(res)
            });
        });
    });
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
 * @returns Object with data result
 */
connection.getData = (queryData) => {

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
    return getResult(executeQuery(sqlQuery, false));
};


/**
 * Insert Data to DB Method
 * @param {object} queryData Object with the params of SQL Query
* @returns Object with data result
 */
connection.insert = (queryData) => {

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
    return getResult(executeQuery(sqlQuery, true));
}


/**
 * Execute Stored Procedure in DB Method
 * @param {object} queryData Object with the params of SQL Query
 * @returns Object with data result
 */
connection.execute = (queryData) => {
    
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
    return getResult(executeQuery(sqlQuery, queryData.noData));
}


//export Module
module.exports = connection;