const Ticket = require('../models/TicketModel'); // Updated import statement to match the actual filename
const qr=require("qrcode");



const createTicket = (req, res) => {
  const data = req.body;
  const stJson = JSON.stringify(data);
  
  qr.toDataURL(stJson, (err, url) => {
    if (err) {
      console.error("Error generating QR code:", err);
      return res.status(500).json({ msg: 'Error generating QR code' });
    }
    
    // Stockez l'URL data du QR code dans les données du ticket
    req.body.qr_code = url;
    
    // Créez le ticket dans la base de données avec les données mises à jour
    Ticket.create(req.body)
      .then(result => res.status(200).json({ result }))
      .catch(error => res.status(500).json({ msg: error }));
  });
};




/*const createTicket = ((req, res) => {
    Ticket.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }))
})*/

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