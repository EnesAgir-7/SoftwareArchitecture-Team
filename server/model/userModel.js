const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email:{
        type: String,
        max:50,
        required: true,
        unique: true,
    },
    address:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        min: 4,
    },
    avatarImage:{
        default:"",
        type:String
    },
    isAvatarImageSet:{
        default:false,
        type:Boolean,
    },
})

module.exports = mongoose.model("Users",userSchema)

