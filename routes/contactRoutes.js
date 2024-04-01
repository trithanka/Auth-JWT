const express=require("express");
const { getContact, createContact, getContacts, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router=express.Router();

//private
router.use(validateToken)

//show contact
router.get("/",getContacts)

//get contact
router.get("/:id",getContact)

//create contact
router.post("/",createContact)

//update contact
router.put("/:id",updateContact)

//delete contact
router.delete("/:id",deleteContact)


module.exports=router;