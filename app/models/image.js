// get an instance of mongoose and mongoose.Schema
var mongoose     = require('mongoose');
var imageSchema   = new  mongoose.Schema({
	filename	   : String,
	dateUploaded   : String

},
		{ versionKey: false ,
	 	  timestamps: true 
	 	}
);

mongoose.model('Image', imageSchema);
