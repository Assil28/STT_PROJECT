const Ticket = require('../models/ticketModel.js'); // Updated import statement to match the actual filename

const getTickets = ((req, res) => {
    Ticket.find({})
        .then(result => res.json({ result }))
        .catch(() => res.json({ msg: 'Tickets not found' }))
})

const getTicket= (req, res) => {
    Ticket.findOne({ _id: req.params.TicketID })
      .then(result => {
        if (!result) {
          return res.json({ msg: 'Ticket not found' });
        }
        res.json({ result });
      })
      .catch(error => res.json({ msg: 'Error finding Ticket', error }));
  };
  


const createTicket = ((req, res) => {
    Ticket.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateTicket = ((req, res) => {
    Ticket.findOneAndUpdate({ _id: req.params.TicketID })
        .then(result => res.json({ result }))
        .catch(() => res.json({ msg: 'Ticket not found' }))
})


  
  





module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
}