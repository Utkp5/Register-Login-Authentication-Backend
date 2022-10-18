const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");


const userSchema = new mongoose.Schema(
    {
        Name : {
            type : String,
            require : true,
        },
        userEmail : {
            type : String,
            require : true, 
        },
        password : {
            type : String,
            require : true,
        },
        verified: { 
            type: Boolean, 
            default: false 
        },
    },
    {
        timestamps: true,
    }
);


const validate = (user) => {
    const schema = Joi.object({
      Name : Joi.string().min(3).max(255).required(),
      userEmail : Joi.string().email().required(),
      password : Joi.string().min(8).max(25).required,
    });
    return schema.validate(user);
  };

const User = mongoose.model("user", userSchema);
module.exports = {User , validate};


