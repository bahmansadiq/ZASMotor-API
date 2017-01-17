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
		dealerName:req.body.dealerName,
		phone:req.body.phone,
		fax:req.body.fax,
		emailAddress:req.body.emailAddress,
		facebookAddress:req.body.facebookAddress,
		twitterAddress:req.body.twitterAddress,
		youtubeAddress:req.body.youtubeAddress,
		streetAddress:req.body.streetAddress,
		city:req.body.city,
		country:req.body.country,
		lat:req.body.lat,
		long:req.body.long
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

/////////************************///////////////
/////// delete a dealer with this id
/////////************************///////////////
module.exports.deleteDealer=function(req, res){
  Dealer.remove({
        _id: req.params.DealerId
    }, function(err, dealer) {
        if (err)

            res.send(err);

        res.json({ message: 'Successfully deleted the dealer' });

    });
}


