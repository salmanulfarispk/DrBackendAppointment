const mongoose=require("mongoose")




const categorySchema=new mongoose.Schema({
     
    categoryname:String,
    image:String
})

module.exports= mongoose.model("Categorylist",categorySchema)