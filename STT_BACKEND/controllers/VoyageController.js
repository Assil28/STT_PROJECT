const Voyage = require("../models/voyageModel");

const getVoyages = ((req, res) => {
    Voyage.find({})
        .then(result => res.json({ result }))
        .catch(() => res.json({ msg: 'Voyages not found' }))
})

const getVoyage = (req, res) => {
    Voyage.findOne({ _id: req.params.VoyageID })
      .then(result => {
        if (!result) {
          return res.json({ msg: 'Voyage not found' });
        }
        res.json({ result });
      })
      .catch(error => res.json({ msg: 'Error finding Voyage', error }));
  };
  

  const deleteVoyage = ((req, res) => {
    Voyage.findOneAndDelete({ _id: req.params.VoyageID })
        .then(result => {
            if (!result) {
                return res.json({ msg: 'Voyage not found' });
            }
            res.json({ result });
        })
        .catch(error => res.status(500).json({ msg: 'Error deleting Voyage', error }));
})


const createVoyage = ((req, res) => {
    Voyage.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateVoyage = ((req, res) => {
    Voyage.findOneAndUpdate({ _id: req.params.VoyageID })
        .then(result => res.json({ result }))
        .catch(() => res.json({ msg: 'Voyage not found' }))
})


const getVoyageByTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ ticket_id: req.params.TicketId }).exec();
      const voyage = await Voyage.findOne({ voayge_id: ticket.TicketId }).exec();
      res.json({ voyage });
    } catch (error) {
      console.error('Error fetching voyages by ticket:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  const getVoyageByVilleDateTime = async (req, res) => {
    try {
             const voyage = await Voyage.findOne({ $and: [{ ville_depart: req.body.ville_depart }, { ville_arrive: req.body.ville_arrive },{heure_depart_voyage:req.body.heure_depart_voyage},{date:req.body.date}] });

            res.json({ voyage });
            } catch (error) {
            console.error('Error fetching voyages by villeDateTime:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            }
  };
  





module.exports = {
   getVoyages,
   getVoyage,
   createVoyage,
   updateVoyage,
   deleteVoyage,
   getVoyageByTicket,
   getVoyageByVilleDateTime

}