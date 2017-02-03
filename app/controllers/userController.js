// index.js
var mongoose=require("mongoose");
var express = require("express");  
var bodyParser = require("body-parser");  
var jwt = require("jwt-simple");  
var auth = require("./auth.js")();  
var users=mongoose.model("Users");  
var cfg = require("../../config.js");  
var app = express();

app.use(bodyParser.json());  
app.use(auth.initialize());


module.exports.getUser=(auth.authenticate(),
    function(req, res) {  
    res.json(users[req.user.id]);
});


module.exports.postUser= function(req, res) {  
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        var user = users.find(function(u) {
            return u.email === email && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.id
            };
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.json({
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
};
