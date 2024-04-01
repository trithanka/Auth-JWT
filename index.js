const express=require('express');
const mongoose=require("mongoose")
const app=express()
const dotenv=require("dotenv");
const errorHandler = require('./middleware/errorHandle.js');
const Contact = require('./models/contactModel.js');
const User = require('./models/userModel.js');
dotenv.config()

app.use(express.json())
app.use("/api/contacts",require("./routes/contactRoutes.js"))
app.use("/api/users",require("./routes/userRoutes.js"))
app.use(errorHandler)
app.use(Contact)
app.use(User)

if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not defined in the environment variables.");
    process.exit(1);
}
mongoose.connect(process.env.MONGO_URL,).then(()=>{
    console.log("connected to MongoDB")
}).catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT,()=>{
    console.log("server runing");
})