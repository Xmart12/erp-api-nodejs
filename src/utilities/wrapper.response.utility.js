//create module
const wrapper = {};

/**
 * Create a Wrapper for Response
 * @param {int} statusCode HTTP Status Code
 * @param {Object} data Data Response
 * @returns Object status code and data
 */
wrapper.send = (statusCode, data) => {
    return {
        statusCode: statusCode,
        data: data
    };
};


/**
 * Set response data
 * @param {string} err Error Message
 * @param {object} data Object result to send
 * @param {boolean} notfound Strict Not Found Flag
 * @param {object} one One item flag
 * @returns Object status code and data
 */
wrapper.auto = (err, data, notfound, one) => {
    if (err) {
        return wrapper.error(err);
    } else if (data.length > 0) {
        return wrapper.ok((one) ? data[0] : data);
    } else {
        return (notfound) ? wrapper.notfound() : wrapper.ok(data);
    }
};

/**
 * Send OK Wrapper
 * @param {Object} data Data Response
 * @returns Object status code and data
 */
wrapper.ok = (data) => wrapper.send(200, data);

/**
 * Send Created Wrapper
 * @param {Object} data Data Response
 * @returns Object status code and data
 */
wrapper.created = (data = null) => wrapper.send(201, data);

/**
 * Send Bar Request Wrapper
 * @param {string} message Message to user
 * @returns Object status code and data
 */
wrapper.badrequest = (message = null) => wrapper.send(400, { 
    message: (message) ? message : 'Error request' 
});

/**
 * Send Unauthorized Wrapper
 * @returns Object status code and data
 */
wrapper.unauthorized = () => wrapper.send(401, { message: 'Unauthorized action' });

/**
 * Send Forbidden Wrapper
 * @returns Object status code and data
 */
wrapper.forbidden = () => wrapper.send(403, { message: 'Unallowed access' });

/**
 * Send NotFound Wrapper
 * @param {string} message Message to user
 * @returns Object status code and data
 */
wrapper.notfound = (message = null) => wrapper.send(404, {
    message: (message) ? message : null
});

/**
 * Send Internal Server Error Wrapper
 * @param {*} message Message to user
 * @returns Object status code and data
 */
wrapper.error = (message = null) => wrapper.send(500, {
    message: (message) ? message : 'Server Error'
});


//export module
module.exports = wrapper;