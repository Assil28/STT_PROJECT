const mongoose = require('mongoose')



// biha n7adedo kifeh nsayvoo les donnée fl base de donnée
const Schema = mongoose.Schema

const VoyageModel = new Schema({
   
    heure_depart_voyage:String,
    heure_arrive_voyage:String,
    date:Date,
    nbr_places_reserve:Number,

    bus_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
      },
      trajet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trajet',
        required: true
      },
  
})



const Voyage = mongoose.model('Voyage', VoyageModel)

module.exports = Voyage