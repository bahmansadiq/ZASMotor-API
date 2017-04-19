var express = require('express');
var router   = require('../routes/routes'); 
var multer = require('multer');
var mongoose = require('mongoose');
var storage = multer.memoryStorage();
var upload = multer({storage: storage});
//var Image= mongoose.model('Image');
var path = require('path');
var app = express();
//var router=express.Router();

//path and originalname are the fields stored in mongoDB
var imageSchema = mongoose.Schema({
   path: {
       type: String,
       required: true,
       trim: true
   },
   originalname: {
       type: String,
       required: true
   }
   
});


var Image = module.exports = mongoose.model('files', imageSchema);

module.exports.getImages=function(req, res){
	Image.find(function(err, image){
		if(err)
			res.send(err);
		else
          res.status(200).json(image)
  });
};

// module.exports.getImageById = function(id, callback) {
  
//  Image.findById(id, callback);


// }


module.exports.getImageById=function(req, res) {
    Image.findById(req.params.id, function(err, image){
//console.log(req.params.id);

if(err) 
   res.send(err);
else
  res.status(200).json(image);

})
};


// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
var storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, 'uploads/')
   },
   filename: function(req, file, cb) {
       cb(null, file.originalname);
   }
});



 // To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
 var storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, 'uploads/')
   },
   filename: function(req, file, cb) {
       cb(null, file.originalname);
   }
});
 

// router.get('/postImage', function(req, res, next) {
//  res.render('index.ejs');
// });


module.exports.postImage=postImage=(upload.array('photos', 2), function(req, res, next) {
 console.log(req.files);
 //res.send(req.files[0].path);
 res.send("something");

/*req.files has the information regarding the file you are uploading...
from the total information, i am just using the path and the imageName to store in the mongo collection(table)
*/

 var imageName = req.files[0].originalname;
  var path = req.files[0].path;
  res.send(req.files[0]);
 var imagepath = {};
 imagepath['path'] = path;
 imagepath['originalname'] = imageName;
 
 //imagepath contains two objects, path and the imageName
 
 //we are passing two objects in the addImage method.. which is defined above..

 postImage(imagepath, function(err) {
 
 });
 
});
 
