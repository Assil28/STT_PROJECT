const Trajet = require("../models/TrajetModel");

const getTrajets = ((req, res) => {
    Trajet.find({})
        .then(result => res.json({ result }))
        .catch(() => res.json({ msg: 'Trajets not found' }))
})

const getTrajet = (req, res) => {
    Trajet.findOne({ _id: req.params.TrajetID })
      .then(result => {
        if (!result) {
          return res.json({ msg: 'Trajet not found' });
        }
        res.json({ result });
      })
      .catch(error => res.json({ msg: 'Error finding Trajet', error }));
  };

  const deleteTrajet = ((req, res) => {
    Trajet.findOneAndDelete({ _id: req.params.TrajetID })
        .then(result => {
            if (!result) {
                return res.json({ msg: 'Trajet not found' });
            }
            res.json({ result });
        })
        .catch(error => res.status(500).json({ msg: 'Error deleting Trajet', error }));
})


const createTrajet = ((req, res) => {
    Trajet.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }))
})

const updateTrajet = ((req, res) => {
    Trajet.findOneAndUpdate({ _id: req.params.TrajetID })
        .then(result => res.json({ result }))
        .catch(() => res.json({ msg: 'Trajet not found' }))
})
module.exports = {
    getTrajets,
    getTrajet,
    deleteTrajet,
    createTrajet,
    updateTrajet,
   
 
 }