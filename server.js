// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var bodyParser  = require('body-parser');
// Body Parser to be used when dealing with file uploads to this server
var busboyBodyParser = require('busboy-body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var Grid        = require('gridfs-stream');
var fs          = require('fs');
var passport    = require('passport'); 
var Customer    = require('./app/models/customer.js'); // get our mongoose model
var Inventory   = require('./app/models/inventory.js'); // get our mongoose model
var Dealer      = require('./app/models/dealer.js');
var Users		= require('./app/models/user.js');
var router      = require("./app/routes/routes"); 
var app         = express();
var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config      = require('./app/config/main'); // get our config file
//var path = require('path');
var conn = mongoose.connection;
// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

// =======================
// configuration =========
// =======================
// use morgan to log requests to the console
app.use(morgan('dev'));
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// Body parsing configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboyBodyParser ({limit: '200mb'}));
app.use(passport.initialize());  


app.use("/api", router);  

Grid.mongo = mongoose.mongo;


// Adds the fs.chunks and fs.files collections to the mongo DB
conn.once('open', function () {
    console.log('open');
    var gfs = Grid(conn.db);

});
module.exports=app;
// =======================
// start the server ======
// =======================
app.listen(config.port);
console.log("you server is running on port "+ config.port+".");