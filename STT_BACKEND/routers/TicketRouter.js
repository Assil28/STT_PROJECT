
const express = require('express')
const router = express.Router()



const  { 
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
} = require('../controllers/TicketController.js')

router.get('/',getTickets)
router.get('/getTicket/:TicketID',getTicket)
router.post('/',createTicket)
router.put('/:TicketID',updateTicket)



module.exports= router