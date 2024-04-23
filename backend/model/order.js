const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const schema = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product'
    },
    quantity:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    isCart:{
        type:Boolean,
        required:true,
        default:true
    },
    isOrder:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true}
)
const Order = mongoose.model("Order",schema)
module.exports = {Order}