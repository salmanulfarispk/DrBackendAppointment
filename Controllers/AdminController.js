const jwt = require("jsonwebtoken");
const Doctorshema = require("../models/DoctorSchema");
const {joiDoctors} = require("../models/validateDoctorSchema");
const mongoose=require("mongoose");
const {Joicategorychema}=require("../models/validateDoctorSchema");
const CategoryList = require("../models/CategoryList");

module.exports = { 
    // Admin login
    login: async (req, res) => {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email },
                process.env.ADMIN_SECRET_KEY
            );

            return res.status(200).json({  
                status: "success",
                message: "Admin login Succesfully",
                token: token
            });
        } else { 
            return res.status(404).json({
                status: "error",
                message: "Invalid Admin"
            });
        }
    },

    // Admin Add Doctors
    AddDoctors: async (req, res) => {
        const { value, error } = joiDoctors.validate(req.body);
        // console.log("value",value)

        if (error) {
            return res.status(404).json({
                error: error.details[0].message
            });
        }

        const { name, image, category, experience, hospital, about } = value;

        try {
            const newDoctor = await Doctorshema.create({
                name,
                image,
                category,
                experience,
                hospital,
                about
            });

            return res.status(201).json({
                status: "success",
                message: "New doctor successfully created",
                data: newDoctor
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    },

      // ViewAll Doctors

      ViewAllDoct: async(req,res)=>{
        const AllDoctors=await Doctorshema.find()
        if(!AllDoctors){
          return res.status(404).json({
            status:"errror",
            message:"Doctor not Found"

          })
        }

         return res.status(200).json({
          status:"success",
          message:"All Doctors Founded succesfully",
          data: AllDoctors
         })
 


      },

       // EditDoctor

       EditDoctor:async(req,res)=>{
                
        const {value,error}= joiDoctors.validate(req.body)
        if(error){
          return res.status(404).json({
            status:"error",
            message:error.details[0].message
          })
        }
  
        const {id,name,image,category,experience,hospital,about}=value;

        const Doctors= await Doctorshema.find()
        if(!Doctors){
          return res.status(404).json({
            status:"error",
            message:"Doctor not found"
          })
        }

        await Doctorshema.findByIdAndUpdate(
            {_id:id},
            {
                name,
                image,
                category,
                experience,
                hospital,
                about
            }
          )
           return res.status(200).json({
            status:"success",
            message:"Doctor updated succesfully" 
          }) 


       },

       //DeleteDoctor

      
        DeleteDoc: async (req, res) => {
            const { id } = req.params;
        
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({
                    status: "error",
                    message: "Invalid Doctor Id"
                });
            }
        
            const Docdelete = await Doctorshema.findOneAndDelete({ _id: id });
            if (!Docdelete) { 
                return res.status(404).json({
                    status: "error",
                    message: "Doctor not found in database"
                });
            }
        
            return res.status(200).json({
                status: "success",
                message: "Doctor successfully deleted"
            });

            
        },
        
     //DoctorById

     DocByID: async (req, res) => {
        try {
          const DoctorID = req.params.id;
          const Doctor = await Doctorshema.findById(DoctorID); 
          if (!Doctor) {
            return res.status(404).json({
              status: "error",
              message: "Doctor not found"
            });
          }
      
          return res.status(200).json({
            status: "success",
            message: "Doctor fetched successfully",
            data: Doctor
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            status: "error",
            message: "Internal server error"
          });
        }

      },

      //CategoryList

      categorylist:async(req,res)=>{
        const {value,error}= Joicategorychema.validate(req.body)

        if (error) {
          return res.status(400).json({ error: error.details[0].message });
      } 
      
      const { categoryname, image } = value;
      try {
        const newCategory = await CategoryList.create({
          categoryname, 
          image
        });

        return res.status(201).json({
            status: "success",
            message: "Category created",
            data: newCategory
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
        
      },













};
