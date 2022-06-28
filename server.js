//import dependences
const express = require('express');
const app = express();
require('dotenv').config();

//get custom dependencies
const routesv1 = require('./src/routes/v1/index.route');
const custommiddleware = require('./src/middlewares/custom.middleware');

//settings
app.set('port', process.env.PORT || 9000);

//middelwares
app.use(express.json());

//custom middlewares
custommiddleware(app);

//set routes
routesv1(app);

//start server
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});