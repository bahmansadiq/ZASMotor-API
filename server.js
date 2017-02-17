// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport    = require('passport'); 
var Customer    = require('./app/models/customer.js'); // get our mongoose model
var Inventory   = require('./app/models/inventory.js'); // get our mongoose model
var Dealer      = require('./app/models/dealer.js');
var Users		= require('./app/models/user.js');
var routerApi   = require("./app/routes/routes"); 
var app         = express();
var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config      = require('./app/config/main'); // get our config file

// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
   
// =======================
// configuration =========
// =======================
// use morgan to log requests to the console
app.use(morgan('dev'));
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Initialize passport for use
app.use(passport.initialize());  


app.use("/api", routerApi);  


module.exports=app;
// =======================
// start the server ======
// =======================
app.listen(config.port);
console.log("you server is running on port "+ config.port+".");