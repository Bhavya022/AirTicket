const User = require('../model/User') 
const bcrypt = require('bcrypt') 
const jwt=require('jsonwebtoken') 

const authController={
    register:async(req,res)=>{
        try{
            const {name,email,password}=req.body;
            const existingUser=await User.findOne({email}) 
            if(existingUser){
                return res.status(400).json({error:'Email already registered'})
            } 
            const hashedPassword = await bcrypt.hash(password,10) 

            const user=new User({
                name,
                email,
                password:hashedPassword,
            }) 
            await user.save() 

            res.status(201).json({message:'User Registered Successfully'})
        } 
        catch(error){
            res.status(500).json({error:'An error occured'})
        }
    },
    login:async(req,res)=>{
        try{
     const {email,password}= req.body 

     const user = await User.findOne({email}) 
     if(!user){
        return res.status(401).json({error:'User Not Found'})
     } 
     const match = await bcrypt.compare(password,user.password) 
     if(!match){
        return res.status(401).json({error:'wrong credentials'})
     } 
     const token = jwt.sign({userId:user._id},'AirTicket',{
        expiresIn:'1h'
     }) 
     return res.status(201).json({token})
        } 
        catch(error){
            res.status(500).json({error:'An error occured'})
        }
    }
} 

module.exports=authController