//import dependencies
const Joi = require('joi');

//export function
module.exports = {

    //send Joi validation
    builder: Joi,

    //send validator function
    validator: (schema, data) => {

        if (!data || Object.keys(data).length === 0) {
            return {
                validation: false,
                message: 'Body request must be an object'
            };
        }

        var validate = schema.validate(data);

        if (validate.error) {
            return {
                validation: false,
                message: validate.error.message.replace(/"/g, "'")
            };
        } else {
            return {
                validation: true,
                message: null
            };
        }
    }
};