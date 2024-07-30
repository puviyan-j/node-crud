const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const route = require("./router")

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("DB IS CONNECTED");
    })
    .catch(() => {
        console.log("DB IS NOT CONNECTED");
    })
app.use(express.json())
app.use("/app",route)
app.use((err,req,res,next)=>{

 const errstatus = err.status||500;
 const errmessage = err.message||"Undifind Error"

 return res.status(errstatus).json({status:errstatus,message:errmessage})

})

app.listen(process.env.PORT, () => {
    console.log("SERVER IS RUNNING");
})