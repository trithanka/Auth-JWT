const mongoose= require("mongoose")
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add the username"]
    },
    email:{
        type:String,
        required:[true,"please add email"],
        unique:[true,"email already taken"]
    },
    password:{
        type:String,
        required:[true,"please add password"],
    }
})

const User=mongoose.model("User",userSchema);
module.exports= User;