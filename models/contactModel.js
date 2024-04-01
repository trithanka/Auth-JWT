const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    name : {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true ,
        lowercase: true ,
        required:true
    },
    phone: {
        type: Number,
        required:true
    }
},{
    timestamps:true
})

const Contact=mongoose.model("Contact",contactSchema);
module.exports=Contact;