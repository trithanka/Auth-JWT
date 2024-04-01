const asyncHandler= require("express-async-handler")
const Contact = require("../models/contactModel")

//get all contact
//GET /api/contacts
const getContacts=asyncHandler(async (req,res)=>{
    const contact=await Contact.find({user_id:req.user.id})

    res.status(200).json(contact)
})


//create contact
//POST /api/contacts
const createContact=asyncHandler(async (req,res)=>{
    console.log(req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("Please provide complete details")
    }
    const savedConatct= await Contact.create({name,email,phone,user_id:req.user.id});

    res.status(201).json(savedConatct)
})


//show contact
//GET /api/contacts/:id
const getContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
})


//update contact
//put /api/contacts/:id
const updateContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("dont have permission")
    }
    const updatedContact=await Contact.findByIdAndUpdate(req.params.id,req.body, { new: true })

    res.status(201).json(updatedContact)
})


//delete contact
//delete /api/contacts/:id
const deleteContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error("dont have permission")
    }
    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(contact)
})



module.exports={getContacts,createContact,getContact,updateContact,deleteContact}