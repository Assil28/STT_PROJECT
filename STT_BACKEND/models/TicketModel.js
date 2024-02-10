const mongoose = require('mongoose')



// biha n7adedo kifeh nsayvoo les donnée fl base de donnée
const Schema = mongoose.Schema

const TicketModel = new Schema({
   
    date_achat:{
        type: Date,
        default: Date.now  // Utilise la fonction Date.now pour obtenir la date actuelle par défaut
    },
    etat:Boolean,
    cin_voyageur:String,
    num_tel:String,
    qr_code:String,
    voyage_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voyage',
        required: true
      },
  
  
})



const Ticket = mongoose.model('Ticket', TicketModel)

module.exports = Ticket