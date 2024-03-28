const mongoose=require("mongoose")



const AppointmentSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      email: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      note: {
        type: String,
        required: false
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', 
        required: true
      }
    

})


module.exports=mongoose.model("AppointMent",AppointmentSchema)