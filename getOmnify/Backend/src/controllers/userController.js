
const bcrypt = require('bcrypt');
const userModel = require("../model/userModel");
const jwt = require('jsonwebtoken')


const createUser = async function (req, res) {
    try {
      let data = req.body;
      
      const { name, email,  password ,phone,profileImage} = data;
      let files = req.files;
      //===== validate body ======//
      if (!isValidRequestBody(data)) {
        return res
          .status(400)
          .send({ status: false, message: "Body cannot be empty" });
      }
  
      //===== validate fname ======//
      if (!isValidData(name)) {
        return res
          .status(400)
          .send({ status: false, message: "please enter your first Name" });
      }
      if (!/^\s*[a-zA-Z ]{2,}\s*$/.test(name)) {
        return res.status(400).send({
          status: false,
          message: `Heyyy....! ${name} is not a valid first name`,
        });
      }
      data.name = name.trim().split(" ").filter((word) => word).join(" ");
  
      
  
  
      //===== validate email ======//
      if (!isValidData(email)) {
        return res.status(400).send({ status: false, message: "please enter email" });
      }
      if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
        return res.status(400).send({ status: false, message: `Heyyy....! ${email} is not a valid email` });
      }
  
      let checkEmail = await userModel.findOne({ email: email });
      if (checkEmail) {
        return res
          .status(400)
          .send({
            status: false,
            message: `Heyyy....! there already exists an account registered with ${email} email address`,
          });
      }
  
      data.email = email.trim();

      if (!isValidData(phone)) {
        return res
          .status(400)
          .send({ status: false, message: "please enter your mobile number" });
      }
      if (!/^\s*(?=[6789])[0-9]{10}\s*$/.test(phone)) {
        return res
          .status(400)
          .send({
            status: false,
            message: `Heyyy....! ${phone} is not a valid phone`,
          });
      }
      let checkPhone = await userModel.findOne({ phone: phone });
      if (checkPhone) {
        return res
          .status(400)
          .send({
            status: false,
            message: `Heyyy....! there already exists an account registered with ${phone} phone`,
          });
      }
  
      // data.phone = phone.trim();
  
      //===== validate and hash password ======//
     
      if (!isValidData(password)) {
        return res.status(400).send({
          status: false,
          message: "please enter Password....!",
        });
      }
      if (!/^[a-zA-Z0-9@*&$#!]{8,15}$/.test(password)) {
        return res.status(400).send({
          status: false,
          message: "please enter valid password min 8 or max 15 digit",
        });
      }
  
      //hashing
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);
      data.password = hash;
  

      //===== create user ======//
     
      let createUserDoc = await userModel.create(data);
      return res.status(201).send({
        status: true,
        message: "Registered Successfully",
        data: createUserDoc,
      });
    } catch (err) {
      console.log("This is the error :", err.message);
      res.status(500).send({ message: "Error", error: err.message });
    }
  };





















let loginUser = async function (req, res) {
    try {
      let data = req.body;
      
      const {email,Password} =data
  
      if (Object.keys(data).length == 0) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide details in body" });
      }
      if (!email|| email.trim().length == 0) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide Email" });
      }
      if (!Password || Password.trim().length == 0) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide Password" });
      }
      if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
        return res.status(400).send({
          status: false,
          message: "Email should be valid email address",
        });
      }
      if (!/^.{8,15}$/.test(Password)) {
        return res.status(400).send({
          status: false,
          message: "password length should be in between 8 to 15",
        });
      }
  
      let userData = await userModel.findOne({ email: email });
      
      if (!userData) {
        return res.status(400).send({
          status: false,
          message: "Email or the Password doesn't match",
        });
      }
  
      const checkPassword = await bcrypt.compare(Password, userData.password)
  
      if (!checkPassword) return res.status(401).send({ status: false, message: `Login failed!! password is incorrect.` });
      let userId = userData._id
      let token = jwt.sign(
        {
          userId: userId,
          project: "Products Management",
        }, "group71-project5", { expiresIn: '7d' },
  
      );
  
      {
        res.status(200).send({ status: true, message: "User login successfull", data: { userId: userId, Token: token } });
      }
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  };

  module.exports = {createUser, loginUser}