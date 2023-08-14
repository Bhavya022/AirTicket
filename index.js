const express = require('express') 
const mongoose = require('mongoose') 
require("dotenv").config 
const {connection} = require('./db')
const PORT = process.env.PORT || 8080 
const jwt = require('jsonwebtoken') 
const bodyParser = require('body-parser') 
//routes 
const authRoutes = require('./routes/authRoutes') 
const flightRoutes = require('./routes/flightRoutes') 
const bookingRoutes = require('./routes/bookingRoutes')
const app = express() 

app.use(express.json())  
//app.use('/',"welcome to AIrTicketApp")
app.use('/api',authRoutes) 
 app.use('/api/flights',flightRoutes) 
 app.use('/api',bookingRoutes) 


app.listen(PORT,async()=>{
    try{
        await connection 
        console.log('connected to mongodb,server started')
    } 
    catch(err){
        console.log(err) 
    }
})


