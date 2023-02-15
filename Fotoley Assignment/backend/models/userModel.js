const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

     name: { type: String, required: true,trim:true },
  
    email: { type: String, required: true, unique: true ,trim:true},
    password: { type: String, required: true, min: 8, max: 15 }, 
    cpassword:{type: String, required: true, min: 8, max: 15 }
  


},{timestamps:true});

module.exports = mongoose.model("user",userSchema);