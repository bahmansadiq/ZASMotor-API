var mongoose     = require('mongoose');
var userSchema   = new  mongoose.Schema({  

    userName: String,
    email:    String,
    password: String
});

mongoose.model('Users', userSchema);




/*
var Users = [{  
    id: 1,
    name: "Hahman",
    email: "bahman@mail.com",
    password: "bahman123"
}, {
    id: 2,
    name: "Hasti",
    email: "hasti@mail.com",
    password: "hasti123"
}];

module.exports = Users; */