//export fucntion
/**
 * Send Response to client
 * @param {object} res Response module object
 * @param {object} data Response data object
 * @returns Response
 */
 module.exports = (res, data) => {
     if (data) {
        if (data.data != null) {
            return res.status(data.statusCode).json(data.data);
        } else {
            return res.status(data.statusCode).send();
        }
     } else {
         return res.status(500).send();
     }
};