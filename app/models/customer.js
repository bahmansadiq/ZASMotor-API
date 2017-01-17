// get an instance of mongoose and mongoose.Schema
var mongoose     = require('mongoose');
var customerSchema   = new  mongoose.Schema({
	FirstName: 		String,
	LastName:    	String,
	MobilePhone: 	String,
	Email: 			String,
	StreetAddress:  String,
	City: 			String,
	State: 			String,
	ZipCode: 		String,
	Country: 		String,
	Note: 			String
},
		{ versionKey: false ,
	 	  timestamps: true 
	 	}
);

mongoose.model('Customer', customerSchema);
