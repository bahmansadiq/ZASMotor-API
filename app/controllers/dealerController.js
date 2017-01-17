var mongoose=require("mongoose");
var Dealer=mongoose.model("Dealer");

// have to mension CRUD methods for the Dealer
/////////************************///////////////
/////// get all the dealers 
/////////************************///////////////
module.exports.getDealer=function(req, res){
	Dealer.find(function(err, dealer){
		if(err)
			res.send(err);
		else
		res.status(200).json(dealer)
	});
};

/////////************************///////////////
/////// post a new dealer
/////////************************///////////////

module.exports.postDealer=function(req, res){
  var dealerData = new Dealer({
	make: req.body.make,

//start working here


});
  // save the sample inventory
	dealerData.save(function(err) {
    if (err)
    	 res.send(err);
 	else 	
 		res.status(200);
	    console.log('dealer saved successfully');
	    res.json({ success: true });

  });
}
