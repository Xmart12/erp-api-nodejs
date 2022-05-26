//export function
/**
 * Set response data
 * @param {string} err Error Message
 * @param {object} data Object result to send
 * @param {boolean} notfound Strict Not Found Flag
 * @param {object} one One item flag
 * @returns Object status code and data
 */
module.exports = (err, data, notfound, one) => {
    if (err) {
        return {
            statusCode: 500,
            data: {
                message: err
            }
        };
    } else if (data.length > 0) {
        return {
            statusCode: 200,
            data: (one) ? data[0]: data
        };
    } else {
        return {
            statusCode: (notfound) ? 404 : 200,
            data: (notfound) ? null : data
        };
    }
};