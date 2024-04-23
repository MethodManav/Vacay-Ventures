const { User } = require('../model/user')
const { Product } = require('../model/product')
const register = async(req,res)=>{
    console.log(req.body)
    const {name,email,phone,password,address,gender}= req.body
    if(name&&email&&phone&&password&&address&&gender){
        const users = new User({
            name,email,phone,password,address,gender
    })
        await users.save().then(res.send({message :"registerd successful"}))
    }
    else{
        return res.send({error:"ALL FILED ARE MUST BE REQUIRED"})
    }
}
/* ------------------------------- user login ------------------------------- */
const login = async(req,res)=>{
    console.log(req.body)
    const {email,password} = req.body
    const findUser = await User.findOne({email})
    if(!findUser){
        return res.send({error:"User Not Found"})
    }
    else{
        if(password == findUser.password){
            res.send({userid:findUser._id,username:findUser.name})
        }
        else{
            res.send({error:"Password Doesn't Match"})

        }
    }
}
/* --------------------------------- product -------------------------------- */
const product= async (req,res)=>{
    const {name,desc,price,photo,isAvailable} = req.body
    const product = new Product({
        name,desc,price,photo,isAvailable
})
    
    // admin.token = token;
    await product.save().then(res.json({success :"post"}))
}
const GetProduct = async (req,res)=>{
    const AllProducts = await Product.find();
    if(AllProducts){
        res.send(AllProducts)
    }
    else{
       return res.send({error:"Products Not Found"})
    }
}
const OneProduct = async(req,res)=>{
    const product = await Product.findById({_id:req.params.id})
    if(product){
        res.send(product)
    }
    else{
        return res.send({error:"Products Not Found"})
    }
}


module.exports = {
    register,
    login,
    product,
    GetProduct,
    OneProduct
}