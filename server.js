//import dependences
const express = require('express');
const app = express();
require('dotenv').config();
const routesv1 = require('./src/routes/v1/index.route');

//settings
app.set('port', process.env.PORT || 9000);

//set routes
routesv1(app);

//middelwares
app.use(express.json());

//start server
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});