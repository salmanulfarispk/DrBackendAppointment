const express=require("express")
const router=express.Router()
const userControler=require("../Controllers/Usercontroller")
const TrycatchHandler=require("../Middlewares/TryCatchHandler")
const verifyToken=require("../Middlewares/userAuth") 



router

.post("/register",TrycatchHandler(userControler.Register))
.post("/login",TrycatchHandler(userControler.Login))
.get('/categorylist', TrycatchHandler(userControler.Categorylist))
.get("/:categoryname", TrycatchHandler(userControler.DocCategory))
.get("/search/:categoryname", TrycatchHandler(userControler.SearchCategory))
.get("/doctors/popularDoctors", TrycatchHandler(userControler.PopularDocts))

 .use(verifyToken) 
 .get("/category/:Docname",TrycatchHandler(userControler.DocByname))
 .get("/details/suggestDocs/doctor", TrycatchHandler(userControler.SuggestDocts))
 .post("/Details/Doctor/BookAppointment",TrycatchHandler(userControler.BookAppointment))


module.exports=router