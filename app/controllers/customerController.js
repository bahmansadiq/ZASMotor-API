var mongoose=require("mongoose");
var Customer=mongoose.model("Customer");

// have to mension CRUD methods for the Customer
/////////************************///////////////
/////// get all the customer 
/////////************************///////////////
module.exports.getCustomer=function(req, res){
	Customer.find(function(err, customer){
		if(err)
			res.send(err);
		else
		res.status(200).json(customer)
	});
};
/////////************************///////////////
/////// post a new customer
/////////************************///////////////
module.exports.postCustomer=function(req, res){
  var customerData = new Customer({
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		MobilePhone: req.body.MobilePhone,
		Email: req.body.Email,
		StreetAddress: req.body.StreetAddress,
		City: req.body.City,
		State: req.body.State,
		ZipCode: req.body.ZipCode,
		Country: req.body.Country,
		Note: req.body.Note

});
  // save the sample customer
	customerData.save(function(err) {
    if (err)
    	 res.send(err);
 	else 	
 		res.status(200);
	    console.log('User saved successfully');
	    res.json({ success: true });

  });
}
/////////************************///////////////
/////// delete the customer with this id
/////////************************///////////////
module.exports.deleteCustomer=function(req, res){
  Customer.remove({
        _id: req.params.CustomerId
    }, function(err, customer) {
        if (err)

            res.send(err);

        res.json({ message: 'Successfully deleted the customer' });

    });
}

/////////************************///////////////
/////Update Customer 
/////////************************///////////////

module.exports.putCustomer=function(req, res) {
    Customer.findById(req.params.CustomerId, function(err, customer){
console.log(req);
		customer.FirstName=req.body.FirstName;
		customer.LastName=req.body.LastName;
		customer.MobilePhone=req.body.MobilePhone;
		customer.Email=req.body.Email;
		customer.StreetAddress=req.body.StreetAddress;
		customer.City=req.body.City;
		customer.State=req.body.State;
		customer.ZipCode=req.body.ZipCode;
		customer.Country=req.body.Country;
		customer.Note=req.body.Note;
		customer.createdAt=req.body.createdAt;

        customer.save(function(err) {
            if(err) res.send(err);
            else res.status(200).json(customer);
        })
    })
}

/////////************************///////////////
// Ends customer routes
/////////************************///////////////