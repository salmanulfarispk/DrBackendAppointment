const mongoose=require("mongoose")



const UserScheme= new mongoose.Schema({
       username:String,
       email:String,
       password:String,

})

module.exports=mongoose.model("User",UserScheme)