
const express = require('express')
const router = express.Router()



const  { 
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    CheckTicket,
    ValiditeTicket

} = require('../controllers/TicketController.js')

router.get('/',getTickets)
router.get('/getTicket/:TicketID',getTicket)
router.post('/',createTicket)
router.put('/:TicketID',updateTicket)
router.put('/check/:TicketID', CheckTicket);
router.get('/validiteTicket/:TicketID', ValiditeTicket);



module.exports= router