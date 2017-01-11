var mongoose=require("mongoose");
var Inventory=mongoose.model("Inventory");

// have to mension CRUD methods for the Inventory
/////////************************///////////////
/////// get all the Inventory 
/////////************************///////////////
module.exports.getInventory=function(req, res){
	Inventory.find(function(err, inventory){
		if(err)
			res.send(err);
		else
		res.status(200).json(inventory)
	});
};
/////////************************///////////////
/////// post a new inventory
/////////************************///////////////

module.exports.postInventory=function(req, res){
  var inventoryData = new Inventory({
	make: req.body.make,
	model: req.body.model,
	year: req.body.year,
	price: req.body.price,
	mileage: req.body.mileage,
	exterior: req.body.exterior,
	interior: req.body.interior,
	vin: req.body.vin,
	stockNumber: req.body.stockNumber,
	engine: req.body.engine,
	transmission: req.body.transmission,
	fuelType: req.body.fuelType,
	mpg: req.body.mpg,
	vehicleOptions: req.body.vehicleOptions,
	vehicleNotes: req.body.vehicleOptions

});
  // save the sample inventory
	inventoryData.save(function(err) {
    if (err)
    	 res.send(err);
 	else 	
 		res.status(200);
	    console.log('Inventory saved successfully');
	    res.json({ success: true });

  });
}

/////////************************///////////////
/////// delete the inventory with this id
/////////************************///////////////
module.exports.deleteInventory=function(req, res){
  Inventory.remove({
        _id: req.params.InventoryId
    }, function(err, inventory) {
        if (err)

            res.send(err);

        res.json({ message: 'Successfully deleted the inventory!' });

    });
}