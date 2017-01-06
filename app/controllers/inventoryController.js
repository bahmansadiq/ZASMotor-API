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
