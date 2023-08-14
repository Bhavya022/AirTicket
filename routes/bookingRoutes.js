const express = require('express') 
const router=express.Router() 

const bookingController=require('../controllers/bookingController') 


router.get('/dashboard',bookingController.getAllBookings)  
  

router.post('/booking',bookingController.createBooking) 

router.put('/dashboard/:id',bookingController.updateBooking) 

router.delete('/dashboard/:id',bookingController.deleteBooking)  
//64da1d98d086f5693050c6ee flightId 
//

module.exports = router; 