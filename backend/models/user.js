const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/MiniAppDB");

const userSchema = new mongoose.Schema({
    username : String,
    name : String,
    email : String,
    password : String,
    profileImage : {
        type : String,
        default : ""
    },
    profileImagePublicId : {
        type : String,
        default : ""
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("user" , userSchema);