const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const schema = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    ordersid:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }],
    amount:{
        type:Number,
        required:true,
        default:0
    },
    isDelete:{
        type:Boolean,
        required:true,
        default:false
    },
    accept:{
        type:String,
        default:null
    }
},{timestamps:true}
)
const PlaceOrder = mongoose.model("PlaceOrder",schema)
module.exports = {PlaceOrder}