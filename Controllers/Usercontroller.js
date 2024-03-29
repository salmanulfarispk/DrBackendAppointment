const {JOIuserShema, AppointmentJoischema}=require("../models/validateDoctorSchema")
const bcrypt= require("bcrypt")
const UserSchema=require("../models/UserSchema")
const jwt=require("jsonwebtoken")
const DoctorSchema = require("../models/DoctorSchema")
const categorySchema=require("../models/CategoryList")
const Appointment = require("../models/Appointment")



module.exports={

     //UserRegistaration
     Register: async(req,res)=>{

          const {value,error}= JOIuserShema.validate(req.body);
          if(error){
            return res.status(404).json({
                status:"error",
                message:"invalid user input data.please check the data"
            })
          }
          try{
            const {username,email,password}=value;

            const hashingPassword= await bcrypt.hash(password, 12)

            await UserSchema.create({
                username,
                email,
                password:hashingPassword
            })
            
            return res.status(201).json({
                status:"success",
                message:"User Registered Successfully"
            });

          }catch(error){
            console.error("Error occurred during user registration:", error);
            return res.status(500).json({
            status: "error",
            message: "Internal server error."
        });
    }
          

     },

     //Login

     Login:async(req,res)=>{
        const {value,error}= JOIuserShema.validate(req.body)
        if(error){
            return res.json(error.message)
        }
         const {email,password}=value;
         const user= await UserSchema.findOne({
            email:email
         })

         const userid=user.id;
         const username=user.username;
         

         if(!user){
            return  res.status(400).json({
                status:"error",
                message:"user not found"
            })
         }

         if(!password || !user.password){
            return res.status(400).json({
                status:"error occured",
                message:"invalid input"
             })
         }

         const passwordmatching=await bcrypt.compare(password,user.password)
         if(!passwordmatching){
            return res.status(401).json({
                status:"error ",
                message:"incorrect password"
             })
         }

         const token= jwt.sign(
            {email:user.email},
            process.env.USER_ACCES_TOKEN_SECRET,{expiresIn:9500})


            return res.status(200).json({
                status:"success",
                message:"Login succesful",
                data:{userid,email,token,username} 
            })   
  
     },  
    

     //DoctorsByCategory

     DocCategory: async (req, res) => {
      try {
          const Doccategory = req.params.categoryname;
          const DoctorBYCategory = await DoctorSchema.find({ category: Doccategory });
  
          if (!DoctorBYCategory) {
              return res.status(404).json({
                  status: "error",
                  message: "Doctors not found in this Category"
              });
          }
  
          return res.status(200).json({
              status: "success",
              message: "Doctor found successfully",
              data: DoctorBYCategory
          });
      } catch (error) {
          console.error("Error in DocCategory:", error);
          return res.status(500).json({
              status: "error",
              message: "Internal server error"
          });
      }
  },
  

     //SearchByCategory


     SearchCategory:async(req,res)=>{
            try {
                const category = req.params.categoryname;

                const search = new RegExp(category, 'i'); 
                const matchedDoctors = await categorySchema.find({ categoryname: { $regex: search } });
        

                if (matchedDoctors.length === 0 || matchedDoctors.length > category.length) {
                    return res.status(404).json({
                        status: "error",  
                        message: `This '${category}' not found in the category list`
                    });
                }

            
                return res.status(200).json({
                    status:"succeess",
                    data:matchedDoctors
                });


            } catch (error) {
                console.error(error);
                return res.status(500).json(
                    { message: 'Server Error' 
                }); 
            }

        },  

      //Getting CategoryList
      Categorylist: async (req, res) => {
        try {
          const categoryitems = await categorySchema.find();
          if (!categoryitems.length) {
            return res.status(404).json({
              status: "error",
              message: "No category items found",
            });
          }
      
          return res.status(200).json({
            status: "success",
            message: "Categories retrieved successfully",
            data: categoryitems,
          });
        } catch (error) {
          return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message,
          });
        }     
      },
      
       //popular Doctors
       PopularDocts: async (req, res) => {
        try {
          const pipeline = [
            {
                $match: {
                    experience: { $gte: 13 }
                }
            },
            { 
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    category: 1,
                    experience: 1,
                    hospital: 1,
                    about: 1
                }
            }
        ];

          

            const popularDoctors = await DoctorSchema.aggregate(pipeline).exec();

            return res.status(200).json({
                status: "success",
                message: "Popular doctors retrieved successfully",
                data: popularDoctors
            });
        } catch (error) {
            console.error("Error in PopularDocts:", error);
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    },

    DocByname: async (req, res) => {
        try {
            const Doctorname = req.params.Docname;
            const DoctorBYName= await DoctorSchema.findOne({ name: Doctorname });
    
            if (!DoctorBYName) {
                return res.status(404).json({
                    status: "error",
                    message: "Doctors not found in this Name"
                });
            }
    
            return res.status(200).json({
                status: "success",
                message: "Doctor found successfully",
                data: DoctorBYName
            });
        } catch (error) {
            console.error("Error in DocCategory:", error);
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    },
        

    SuggestDocts: async (req, res) => {
        try {
          const pipeline = [
            {
                $match: {
                    experience: { $gte: 15 }
                }
            },
            { 
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    category: 1,
                    experience: 1,
                    
                }
            }
        ];


            const suggestDoctors = await DoctorSchema.aggregate(pipeline).exec();

            return res.status(200).json({
                status: "success",
                message: "suggseted doctors retrieved successfully",
                data: suggestDoctors
            });
        } catch (error) {
            console.error("Error in suggestion doctors:", error);
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    },
    
    //send Appointmet
     BookAppointment:async (req, res) => {
        try {
            
            const { value,error } = AppointmentJoischema.validate(req.body);
            // console.log("value",value);
            if (error) {
                return res.status(400).json({
                    status: "error",
                    message: error.details[0].message
                });
            }
    
            const { userId, email, date, time, note, doctorId } = value;

            const newAppointment = await Appointment.create({
                userId,
                email,
                date,
                time,
                note,
                doctorId,
            });
                 
        const doctor = await DoctorSchema.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                status: "error",
                message: "Doctor not found"
            });
        }

        doctor.appointments.push(newAppointment._id);
        await doctor.save();
    
            return res.status(201).json({
                status: "success",
                message: 'Appointment created successfully',
                appointment: newAppointment
            }); 
    
        } catch (err) {
            console.error('Error creating appointment:', err);
            return res.status(500).json({
                message: 'Failed to create appointment'
            });
        }

    },
    
   

    





  



}