const express = require('express')
const router = express.Router();
const {register,login,product,GetProduct,OneProduct} = require('../controller/user');
const { Admin } = require('../model/admin');
const { default: axios } = require('axios');
const { Order } = require('../model/order');
router.post("/register",register)
router.post("/login",login)
router.post("/product",product)
router.get("/products",GetProduct)
router.get("/products/:id",OneProduct)


let count=0
router.get("/index.html",async (req,res)=>{

  const adminislogin=await Admin.findOne({
    email:req.headers.email

  })
  if(adminislogin){
    count=count;
    return res.status(201).json({
      count:count
    })
  }else{
  count+=1;
  res.json({
    count:count
  })
}
})



module.exports  = router