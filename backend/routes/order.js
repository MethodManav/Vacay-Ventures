const express = require('express')
const router = express.Router();
const {cart,order,PlaceOrderGet,AdminPlaceOrderGet,updateOrder,Getcart,GivePermit} = require('../controller/order')
router.post("/cart/:userid/:proid",cart)
router.get("/cart/:userid",Getcart)
router.put("/order/:userid",order)
router.put("/updateOrder/:orderid",updateOrder)
router.get("/PlaceOrder/:userid",PlaceOrderGet)
router.get("/AdminPlaceOrder",AdminPlaceOrderGet)
router.put("/admin/:orderid/:accept",GivePermit)
module.exports = router