
const Flight = require('../model/Flight') 

const flightController = {
    getAllFlights:async(req,res)=>{
        try{
            const flights = await Flight.find() 
            res.status(200).json({flights}) 
        } 
        catch(error){
            res.status(500).json({error:'An error Occured'})
        }
    },
    getFlightById:async(req,res)=>{
        try{
     const flightId = req.params.id;
     const flight = await Flight.findById(flightId)
     if(!flight){
        return res.status(404).json({error:'Flight not found'})
     } 
     res.status(200).json({flight})
        } 
        catch(error){
            res.status(500).json({error:'An error Occured'})
        }
    },
    createFlight:async(req,res)=>{
        try{
            const {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price,}=req.body 

            const newFlight = new Flight({
                airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price,
            }) 
            await newFlight.save() 
            res.status(201).json({message:'Flight created Successfully'})
        } 
        catch(error){  
            console.log(error) 
            res.status(500).send(error)
            //res.status(500).json({error:'An error Occured'})
        }
    } ,
    updateFlight:async(req,res)=>{
        try{
       const flightId = req.params.id;
    const {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price,}=req.body 
    const updatedFlight = await Flight.findByIdAndUpdate(flightId,{airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price, },{new:true}) 
      if(!updatedFlight){
        return res.status(404).json({error:'Flight not found'})
      }  
      await updatedFlight.save()
      return res.status(204).json({message:'Flight Updated'})
        } catch(error){
            res.status(500).json({error:'An error Occured'})
        }
    },
    deleteFlight:async(req,res)=>{
        try{
            const flightId = req.params.id;  
            const deleteFlight = await Flight.findByIdAndDelete(flightId) 
            if(!deleteFlight){
                return res.status(404).json({error:'Flight not found'})  
            } 
            return res.status(202).json({error:'Flight deleted successfully'})
        } 
        catch(error){
            res.status(500).json({error:'An error Occured'})
        }
    }
} 

module.exports=flightController