// get an instance of mongoose and mongoose.Schema
var mongoose     = require('mongoose');
var inventorySchema   = new  mongoose.Schema({
	make: String,
	model: String,
	year: String,
	price: String,
	mileage: String,
	exterior: String,
	interior: String,
	vin: String,
	stockNumber: String,
	engine: String,
	transmission: String,
	fuelType: String,
	mpg: String,
	vehicleOptions: String,
	vehicleNotes: String,
	imageUrl: String

},
		{ versionKey: false ,
	 	  timestamps: true 
	 	}
);
//how to store images in url locall, but you can change it to url remotely
//https://www.youtube.com/watch?v=wdl59LAe4M8

mongoose.model('Inventory', inventorySchema);
