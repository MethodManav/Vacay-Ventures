const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const schema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true}
)
const Admin = mongoose.model("Admin",schema)
module.exports = {Admin}