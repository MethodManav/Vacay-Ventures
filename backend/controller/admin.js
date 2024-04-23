const {Admin}=require("../model/admin")
const { AddBlog } = require("../model/blogschema")
const register = async(req,res)=>{
    console.log(req.body)
    const {email,password}= req.body
        const admin = new Admin({
           email,password
    })
        // admin.token = token;
        await admin.save().then(res.json({success :"post"}))
}
const login = async(req,res)=>{
    console.log(req.body)
    const {email,password} = req.body
    const findAdmin = await Admin.findOne({email})
    console.log(findAdmin)
    if(!findAdmin){
        return res.send({error:"Admin Not Found"})
    }
    else{
        if(password == findAdmin.password){
            res.send({message:"Login Successful"})
        }
        else{
            res.send({error:"Password Doesn't Match"})

        }
    }
}


module.exports={
    login,
    register,
    
}