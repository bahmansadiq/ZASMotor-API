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
	vehicleNotes: String

},
		{ versionKey: false ,
	 	  timestamps: true 
	 	}
);

mongoose.model('Inventory', inventorySchema);
