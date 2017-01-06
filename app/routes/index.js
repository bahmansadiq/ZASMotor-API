var express     = require('express');
var router 		= express.Router();
var customerController=require("../controllers/customerController");
var inventoryController=require("../controllers/inventoryController");
router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
//get post delete and get goes here for all the path controllers
// =======================
// routes for Customers ================
// =======================
router.get('/Customers', customerController.getAllCustomers);
router.post('/Customers', customerController.postCustomer);
router.delete('/customers/:CustomerId', customerController.deleteCustomer);
router.put('/customers/:CustomerId', customerController.putCustomer);
// =======================
// routes for Orders ================
// =======================
router.get('/Inventory', inventoryController.getInventory);
module.exports = router;
