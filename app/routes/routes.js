var express     = require('express');
var router 		= express.Router();
var  app = express();
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage});
var path = require('path');
//var routerApi = express.Router(); 
var userController		=require("../controllers/userController");
var customerController  =require("../controllers/customerController");
var inventoryController =require("../controllers/inventoryController");
var dealerController    =require("../controllers/dealerController");
var imageController     =require("../controllers/imageController");



// Home route. We'll end up changing this to our main front end index later.
app.get('/', function(req, res) {  
  res.send('Relax.... We will put the home page here later.');
});
//get post delete and get goes here for all the path controllers

// =======================
// routes for user login ================
// =======================
router.post('/register',userController.register);
router.post('/authenticate', userController.authenticate);
router.get('/dashboard', userController.dashboard);

// =======================
// routes for Customers ================
// =======================
router.get('/Customers', customerController.getCustomer);
router.post('/Customers', customerController.postCustomer);
router.delete('/customers/:CustomerId', customerController.deleteCustomer);
router.put('/customers/:CustomerId', customerController.putCustomer);
// =======================
// routes for inventories ================
// =======================
router.get('/Inventories', inventoryController.getInventory);
router.post('/Inventories', inventoryController.postInventory);
router.delete('/Inventories/:InventoryId', inventoryController.deleteInventory);

// =======================
// routes for images================
// =======================
router.get('/getImages', imageController.getImages);
router.get('/getImageById/:id',imageController.getImageById);
router.post('/postImage',upload.any(),imageController.postImage);

// =======================
// routes for dealers================
// =======================
router.get('/Dealers', dealerController.getDealer);
router.post('/Dealers', dealerController.postDealer);
router.delete('/Dealers/:DealerId', dealerController.deleteDealer);



module.exports = router;
//module.exports = apiRoutes;

