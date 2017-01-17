// get an instance of mongoose and mongoose.Schema
var mongoose     = require('mongoose');
var dealerSchema   = new  mongoose.Schema({
	dealerName	   : String,
	phone		   : String,
	fax			   : String,
	emailAddress   : String,
	facebookAddress: String,
	twitterAddress : String,
	youtubeAddress : String,
	streetAddress  : String,
	city		   : String,
	country		   : String,
	lat			   : String,
	long		   : String,

},
		{ versionKey: false ,
	 	  timestamps: true 
	 	}
);

mongoose.model('Dealer', dealerSchema);
