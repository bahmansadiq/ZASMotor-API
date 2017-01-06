// get an instance of mongoose and mongoose.Schema
var mongoose     = require('mongoose');
var customerSchema   = new  mongoose.Schema({
	CustomerId: 	String,
	FirstName: 		String,
	LastName:    	String,
	Organization: 	String,
	WebSite: 		String,
	Role: 			String,
	BusinessPhone:  String,
	MobilePhone: 	String,
	Fax: 			String,
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
