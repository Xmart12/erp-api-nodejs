//import dependencies
const { builder, validator } = require('../utilities/validator.utility');

//export model 
module.exports = {

    loginProcedure: 'sp_loginUser',

    loginVal: (body) => {
        var schema = builder.object({
            username: builder.string().required(),
            password: builder.string().required()
        });

        //execute validation
        return validator(schema, body);
    },

    loginParams: (body) => {
        return [ body.username, body.password ];
    }

}