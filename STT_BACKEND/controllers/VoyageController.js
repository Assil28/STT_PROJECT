const Voyage = require("../models/VoyageModel");

const nbrPlaceDispoDansVoyage=((req,res)=>{
  Voyage.findOne({ _id: req.params.idVoyage })
  .then(result => {
    if (!result) {
      return res.json({ msg: 'Voyage not found' });
    }
    res.json({nbr_places_reserve:result.nbr_places_reserve });
  })
  .catch(error => res.json({ msg: 'Error finding Voyage', error }));
})

const ajoutUneResertvation = (async(req, res) => {
  const voyageId = req.params.idVoyage;
  try {
    const updatedVoyage = await Voyage.findByIdAndUpdate(voyageId, { $inc: { nbr_places_reserve: 1 } }, { new: true });
    if (!updatedVoyage) {
      return res.status(404).json({ message: 'Voyage not found' });
    }
    res.status(200).json(updatedVoyage);
  } catch (error) {
    console.error('Error updating voyage:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})



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
  req.body.nbr_places_reserve=0
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

             res.json({ voyageId: voyage._id });
            } catch (error) {
            console.error('Error fetching voyages by villeDateTime:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            }
  };


  const getVoyageByDate = async (req, res) => {
    try {
             const voyage = await Voyage.findOne({date:req.body.date} );

             res.json({ voyage:voyage});
            } catch (error) {
            console.error('Error fetching voyages by villeDateTime:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            }
  };

  const getVoyagesByDate = (req, res) => {
    const { date } = req.params; // corrected
    Voyage.find({ date })
        .then(result => {
            if (result.length === 0) {
                res.status(404).json({ msg: 'No voyages found for the given date' });
            } else {
                res.status(200).json({ result });
            }
        })
        .catch(error => {
            console.error('Error finding voyages by date:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};
const getPriceByVoyage =async (req,res) => {
  try {
    const voyage = await Voyage.findOne({_id:req.params.VoyageID} );
    console.log(voyage);
    res.json({ prix:voyage.prix});
   } catch (error) {
   console.error('Error fetching voyages by id:', error);
   res.status(500).json({ error: 'Internal Server Error' });
   }
}

const getHeureOfVoyages = async (req, res) => {
  try {
    const voyages = await Voyage.find({
      $and: [
        { ville_depart: req.params.ville_depart },
        { ville_arrive: req.params.ville_arrive },
        { date: req.params.date }
      ]
    });

    // Extract unique hours from the found voyages
    const uniqueHours = [...new Set(voyages.map(voyage => voyage.heure_depart_voyage))];

    res.json({ uniqueHours });
  } catch (error) {
    console.error('Error fetching hours of voyages:', error);
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
   getVoyageByVilleDateTime,
   getVoyagesByDate,
   getPriceByVoyage,
   getHeureOfVoyages,
   nbrPlaceDispoDansVoyage,
   ajoutUneResertvation

}