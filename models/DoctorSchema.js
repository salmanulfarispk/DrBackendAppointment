const mongoose=require("mongoose")



  const DocSchema= new mongoose.Schema({
    
      name:String,
      image:String,
      category:String,
      experience:Number,
      hospital:String,
      about:String,
      appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]

  })

  module.exports= mongoose.model("Doctor",DocSchema)