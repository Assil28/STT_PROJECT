const mongoose = require('mongoose')

// biha n7adedo kifeh nsayvoo les donnée fl base de donnée
const Schema = mongoose.Schema

const TrajeteModel = new Schema({
    ville_depart:String,
    ville_arrive:String,
     prix:Number,

   
  
})



const Trajet = mongoose.model('Trajet', TrajeteModel)

module.exports = Trajet