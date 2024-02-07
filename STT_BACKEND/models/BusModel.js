const mongoose = require('mongoose')



// biha n7adedo kifeh nsayvoo les donnée fl base de donnée
const Schema = mongoose.Schema

const BusModel = new Schema({
    numBus:String,
    type:String,
    nbr_places:Number,
    est_disponible:Boolean,
  
})



const Bus = mongoose.model('Bus', BusModel)

module.exports = Bus