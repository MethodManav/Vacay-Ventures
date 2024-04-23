const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const schema = new Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    isAvailable:{
        type:Boolean,
        required:true,
        default:true
    }
},{timestamps:true}
)
const Product = mongoose.model("Product",schema)
module.exports = {Product}