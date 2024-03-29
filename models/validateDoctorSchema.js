const Joi = require("joi");

const joiDoctors = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    image: Joi.string().required(),
    category: Joi.string().required(),
    experience: Joi.number().required(),
    hospital: Joi.string().required(),
    about: Joi.string().required(),
    
});


const JOIuserShema=Joi.object({
    
    username:Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email().required(),
    password:Joi.string().required(),
 
});

const Joicategorychema=Joi.object({
    categoryname:Joi.string().required(),
    image: Joi.string().required(),
});


const AppointmentJoischema = Joi.object({
    userId: Joi.string().required(),
    email: Joi.string().email().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    note: Joi.string().allow('').optional(),
    doctorId: Joi.string().required()
});

module.exports = { joiDoctors,JOIuserShema,Joicategorychema,AppointmentJoischema }
