const mongoose=require('mongoose')
const {Schema} = require('mongoose')

const blogadd=mongoose.Schema({
  title:{
    type:String,
    require:true
  },
  description:{
    type:String,
    require:true,
  },
  image:{
    data: Buffer, 
    contentType: String 
  }

})

const AddBlog= mongoose.model("AddBlog",blogadd)
module.exports = {AddBlog}
