const mongoose = require('mongoose')



// biha n7adedo kifeh nsayvoo les donnée fl base de donnée
const Schema = mongoose.Schema

const VoyageModel = new Schema({
  _id:String,
    ville_depart:String,
    ville_arrive:String,
 
    heure_depart_voyage:String,
    heure_arrive_voyage:String,
    date:Date,
    nbr_places_reserve:Number,
    prix:Number,

    bus_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
      },
  
})



const Voyage = mongoose.model('Voyage', VoyageModel)

module.exports = Voyage