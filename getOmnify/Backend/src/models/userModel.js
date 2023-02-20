const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

     name: { type: String, required: true,trim:true },
    
    email: { type: String, required: true, unique: true ,trim:true},
    profileImage: { type: String ,trim:true }, // s3 link
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8, max: 15 }, // encrypted password
  


},{timestamps:true});

module.exports = mongoose.model("user",userSchema);