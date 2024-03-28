const express=require("express")
const app=express()
let port=3001;
require('dotenv').config();
const mongoose=require("mongoose")
const cors = require('cors');
const adminroute=require("./Routes/adminRoute")
const userRoute=require("./Routes/userRoute")

app.use(cors())
 
const  DB= 'mongodb://localhost:27017/Doctor_Appointment';
mongoose.connect(DB)
    .then(() => console.log('Connected to Database'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
 


 app.use(express.json());


app.use("/admin",adminroute)
app.use("/user",userRoute)



app.listen(port,()=>{
    console.log("Running..",port)
})  