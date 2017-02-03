var express     = require('express');
var router 		= express.Router();
var userController		= require("../controllers/userController");
var customerController  =require("../controllers/customerController");
var inventoryController =require("../controllers/inventoryController");
var dealerController    =require("../controllers/dealerController");
var gridfsController    =require("../controllers/gridfsController");
router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
//get post delete and get goes here for all the path controllers
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
// routes for dealers================
// =======================
router.get('/Dealers', dealerController.getDealer);
router.post('/Dealers', dealerController.postDealer);
router.delete('/Dealers/:DealerId', dealerController.deleteDealer);
// =======================
// routes for images================
// =======================
router.get('/Images', gridfsController.getImage);
router.post('/Images', gridfsController.postImage);

// =======================
// routes for user authentication================
// =======================
router.get('/Auth', userController.getUser);
router.post('/Auth', userController.postUser);
module.exports = router;
