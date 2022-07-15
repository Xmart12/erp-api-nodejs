//import dependences
require('dotenv').config();
const env = process.env;

//export values
module.exports = db = {
    erp: {
        host: env.DB_SERVER,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
        port: env.DB_PORT || 3306,
        typeCast: castField = (field, useDefaultTypeCasting) => {
            if ((field.type === "BIT") && (field.length === 1) ) {
                var bytes = field.buffer();
                return (bytes[0] === 1);
            }
    
            return useDefaultTypeCasting();
        }
    }
};
