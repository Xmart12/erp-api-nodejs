//import dependencies
const moment = require('moment');
const { builder, validator } = require('../utilities/validator.utility');

//export model
module.exports = {
    table: 'Users',
    fields: [ 
        'Id', 'Username', 'Password', 'Email', 'Name', 'Active', 'Created', 'Creator', 'Modified', 'Modifier' 
    ],
    insert: 'sp_createUser',

    user: (usr, userlogin) => {
        return {
            username: usr.username,
            password: usr.password,
            email: usr.email,
            name: usr.name,
            active: usr.active ?? false,
            created: usr.created ?? moment().format('YYYY-MM-DD hh:mm:ss'),
            creator: usr.creator ?? userlogin,
            modified: usr.modified ?? moment().format('YYYY-MM-DD hh:mm:ss'),
            modifier: usr.modifier ?? userlogin,
        }
    },

    params: (usr, userLogin) => {
        return [usr.username, usr.password, usr.email, usr.name, userLogin];
    },

    validation: (body) => {
        //schema builder
        var schema = builder.object({
            username: builder.string().required(),
            password: builder.string().required(),
            email: builder.string().email({ minDomainSegments: 2 }),
            name: builder.string().required(),
            active: builder.boolean()
        });

        //execute validation
        return validator(schema, body);
    }

}