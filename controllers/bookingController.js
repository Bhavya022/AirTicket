const Booking = require('../model/Booking') 
const User = require('../model/User') 
const Flight = require('../model/Flight') 

const bookingController={
    createBooking:async(req,res)=>{
        try{
       const {userId,flightId}=req.body 
       const user = await User.findById(userId) 
       const flight = await Flight.findById(flightId) 
       if(!user || !flight){
        return res.status(404).json({error:'user or flight not found'})
       } 

       const booking = new Booking({
        user:userId,
        flight:flightId,
       }) 
       await booking.save() 
       res.status(201).json({message:'Booking created successfully'})
        } 
        catch(err){
            res.status(500).json({error:'An error occured'})
        }
    },
    getAllBookings:async(req,res)=>{
        try{
       const bookings = await Booking.find() 
       .populate('user','name email ')
       .populate('flight','airline flightNo') 
       res.status(200).json({bookings})
        } 
        catch(err){
            res.status(500).json({error:'An error occured'})
        }  
    },
    updateBooking:async(req,res)=>{
        try{
      const bookingId = req.params.id;
      const {userId,flightId}=req.body 
      const user = await User.findById(userId) 
       const flight = await Flight.findById(flightId) 
       if(!user || !flight){
        return res.status(404).json({error:'user or flight not found'})
       } 
     const updatedBooking= await Booking.findByIdAndUpdate(
        bookingId,{user:userId,flight:flightId},
        {new:true}
     ) 
     if(!updatedBooking){
        return res.status(404).json({error:'Booking not found'})
      }  
      await updatedBooking.save()
      return res.status(204).json() 
        } 
        catch(err){
            res.status(500).json({error:'An error occured'})
        }
    },
    deleteBooking:async(req,res)=>{
        try{
      const bookingId = req.params.id
      const deleteBooking = await Booking.findByIdAndDelete(bookingId) 
      if(!deletedBooking){
        return res.status(404).json({error:'Booking not found'})
      }  
      res.status(202).json({message:'Booking deleted Successfully'})
        } 
        catch(err){
            res.status(500).json({error:'An error occured'})
        }
    }
} 

module.exports=bookingController