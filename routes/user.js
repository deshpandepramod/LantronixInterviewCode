const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../model/User");
const config = require('../config/mailDetails');
//const sendMail = require('./sendMail');
//var rand,mailOptions,host,link;
//const logs = require('../logger');
//const logger = logs.LOG;

router.post("/register", [
  check("username", "Please enter a valid username").not().isEmpty(),
  check("firstName","Please provide firstName").not().isEmpty(),
  check("lastName","Please provide lastName").not().isEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 9
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('There was error in request body passed',errors);
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const { username, firstName, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({
      email
    });
    if (user) {
      console.log('User with same mail already exists.');
      return res.status(400).json({
        msg: "User with this email already exists."
      });
    }
    user = new User({
      username,
      firstName,
      lastName,
      email,
      password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, "uniqueString", {
      expiresIn: 10000
    }, (err, token) => {
      if (err) throw err;
      console.log('New user created with mail id',user.email,'.');
    /*rand=Math.floor((Math.random() * 100) + 54);
      host=<"HOST Details">;
      link="http://"+req.get('host')+"/verify?id="+rand;
			mailOptions = {
			  from: config.mailId,
			  to: user.email,
			  subject : "Please confirm your Email account",
			  generateTextFromHTML: true,
			  html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
			}
			sendMail.smtpTransport.sendMail(mailOptions, (err, res) => {
			  err ? console.log(err) : console.log("mail sent", JSON.stringify(res));
			  sendMail.smtpTransport.close();
      })
      console.log("Mail has been sent to",user.email,".");     
      */
      res.status(200).json({
        "message": "A verification mail has been sent to your registered mail."
      });
    });
  } catch (err) {
    console.log("Error occured",err.message);
    res.status(500).send("Error in registering user.");
  }
});
router.post("/login", [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 6
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('There was error in request body passed',errors);
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const { email, password } = req.body;
  try {
    let userData = await User.findOne({email});
    if (!userData) return res.status(400).json({
      message: "This user does not exist, please check user details provided"
    });
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) return res.status(400).json({
      message: " Password provided is incorrect!"
    });
    const user = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        firstname: userData.firstName,
        lastname: userData.lastName
      };
    jwt.sign(user, "uniqueString", {
      expiresIn: 3600
    }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        token, 
        user
      });
    });
  } catch (error) {
    console.error('There was some error',error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
module.exports = router;