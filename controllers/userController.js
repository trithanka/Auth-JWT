const asyncHandler= require("express-async-handler");
const bcrypt=require("bcrypt")
const User = require("../models/userModel");
const jwt=require("jsonwebtoken");

//register a usr
//post /api/users/register
const registerUser=asyncHandler (async (req,res)=>{
    const{username,email,password}=req.body;
    if (!username || !email || !password){
        res.status(400)
        throw new Error("all fields are mendatory")
    }
    const userAvailable= await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("user already register")
    }
    //bcrypt
    const hashedPassword=await bcrypt.hash(password,10);
    
    const savedUser=await User.create({username,email,password:hashedPassword});
    if(savedUser){
        res.status(201).json({_id:savedUser.id,email:savedUser.email})
    }else{
        res.status(400);
        throw new Error("user data is not valid")
    }

    res.json({message:"register the user"})
})

//login a user
//post /api/users/login
const loginUser=asyncHandler (async(req,res)=>{
    const {email,password}=req.body;
    if (!email || !password){
        res.status(400)
        throw new Error("all fields are mendatory")
    }
    const user =await User.findOne({email})
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    //compare password with hashed password
    const passwordMatch=await bcrypt.compare(password,user.password)
    if(!passwordMatch){
        res.status(401);
        throw new Error("Invalid email or password");
    }
    //return jsonwebtoken
    const accessToken=jwt.sign({
        _id:user._id,
        username:user.username,
        email:user.email
    },process.env.SECERET_TOKEN,{expiresIn: "3h" })
    res.status(200).json({accessToken})
})

//current user
//get /api/users/current
//private
const currentUser=asyncHandler(async(req,res)=>{
    res.json(req.user)
})


module.exports={registerUser,loginUser,currentUser}