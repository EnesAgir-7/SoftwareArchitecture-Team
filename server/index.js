const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messagesRoute"); 
const userRoutes = require("./routes/userRoutes"); 

const app = express();
require("dotenv").config();

app.use("/api/messages", messageRoutes);
app.use("/api/auth",userRoutes);

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("Database connection Success");
    })
    .catch((err)=>{
        console.log(err.message);
    });

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server Started on Port ${process.env.PORT}`);
})