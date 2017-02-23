// auth.js
var express = require('express');
var app=express();
var mongoose=require("mongoose");
var passport = require('passport'); 
var config = require('../config/main');  
//var User = require('../models/user'); 
var User=mongoose.model("User");
var jwt = require('jsonwebtoken');
dashboardUser=[];
// have to mension CRUD methods 
/////////************************///////////////
/////// get all the user registeration authentication
/////////************************///////////////


// Bring in defined Passport Strategy
require('../config/passport')(passport);  
//Now we can start on our routes. We will start by creating the route group called apiRoutes. We will now be working down without jumping all over the place in the code. That said, this goes beneath the passport strategy import we just did:

// Create API group routes
var apiRoutes = express.Router();  
//Next, we can create our registration route:




// Register new users
module.exports.register= function(req, res) {  
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
};

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
module.exports.authenticate=function(req, res) {  
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
           dashboardUser.push(user);
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, config.secret, {
            expiresIn: 10080 // in seconds
          });
        
          res.json({ success: true, token: 'JWT ' + token});
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
};

// Protect dashboard route with JWT
// module.exports.dashboard=(passport.authenticate('jwt', { session: false }), function(req, res) {  
//   console.log("this is response log"+res);
//   res.send('It worked! User id is: ' + res.user._id + '.');
// });

module.exports.dashboard=(passport.authenticate('jwt', { session: false }), function(req, res) {  
  console.log("this is response log");
  res.send('It worked! User id is: '  +dashboardUser[0]._id+ '.');
});
