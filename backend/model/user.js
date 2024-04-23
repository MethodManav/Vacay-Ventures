const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const schema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
       required:true
    }
},{timestamps:true}
)
const User = mongoose.model("User",schema)
module.exports = {User}