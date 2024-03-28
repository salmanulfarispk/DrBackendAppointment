const express=require("express")
const router=express.Router()
const adminControler=require("../Controllers/AdminController")

const Trycatchhandler=require("../Middlewares/TryCatchHandler")
const verifytoken=require("../Middlewares/AdminAuth")
const imageupload=require("../Middlewares/imageUploads/ImageUploads")

  

router.post('/login',Trycatchhandler(adminControler.login))

router.use(verifytoken)
router.post('/addDoctors',imageupload,Trycatchhandler(adminControler.AddDoctors))
router.get('/AllDoctors',Trycatchhandler(adminControler.ViewAllDoct))
router.patch('/AllDoctors/EditDoc',imageupload,Trycatchhandler(adminControler.EditDoctor))
router.delete('/AllDoctors/DeleteDoc/:id',Trycatchhandler(adminControler.DeleteDoc))
router.get('/doctor/:id',Trycatchhandler(adminControler.DocByID))
router.post('/categorylist',imageupload,Trycatchhandler(adminControler.categorylist))


  
 

module.exports= router;