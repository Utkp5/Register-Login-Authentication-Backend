const sendEmail = require("../utils/sendEmail");
const Token = require("../models/token");
const {User , validate } = require("../models/user");
const crypto = import ("crypto") ;
const express = require("express");
const router = express.Router();


router.post("/",async(req,res) => {
    try {
        
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send(error.details[0].message);

        let user = await User.findOne({userEmail : req.body.userEmail});
        if(user)
            return res.status(400).send("User wuth given email is already exist!");


        user = await new User({
            Name : req.body.Name,
            userEmail : req.body.userEmail,
            password : req.body.password,
        }).save();


        let token = await new Token({
            userId : user._id,
            token :  crypto.randomBytes(32).toString("hex"),
        }).save();


        const message  = `http://localhost:5000/api/user/verify/${user.id}/${token.token}`;
        await sendEmail (user.userEmail, "Verify Email",message );
        res.send("An Email sento to your account please verify");

    } catch (error) {
        res.status(400).send("An error occured");
    }
});


router.get("/verify/:id/:token", async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send("Invalid link");
  
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link");
  
      await User.updateOne({ _id: user._id, verified: true });
      await Token.findByIdAndRemove(token._id);
  
      res.send("email verified sucessfully");
    } catch (error) {
      res.status(400).send("An error occured");
    }
  });
  
  module.exports = router;
