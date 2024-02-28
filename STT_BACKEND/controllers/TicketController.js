const Ticket = require('../models/TicketModel.js');
const Voyage = require('../models/VoyageModel.js');
// Updated import statement to match the actual filename
const qr = require("qrcode");



const createTicket = (req, res) => {
  const data = req.body;
  const stJson = JSON.stringify(data);
  var coordones;
  qr.toDataURL(stJson, (err, url) => {
    if (err) {
      console.error("Error generating QR code:", err);
      return res.status(500).json({ msg: 'Error generating QR code' });
    }

    // Stockez l'URL data du QR code dans les données du ticket
    req.body.qr_code = url;

    // Créez le ticket dans la base de données avec les données mises à jour
    Ticket.create(req.body)
      .then(result => {
        coordones = result._id
        ////////////////////////////////
        const stJson2 = JSON.stringify(coordones);
        qr.toDataURL(stJson2, (err, url) => {
          if (err) {
            console.error("erreur creation de limage:", err);
            return res.status(500).json({ msg: 'erreur' });
          }
          // Générez un nom de fichier unique en utilisant le timestamp actuel
          const fileName = `TicketSTT_${Date.now()}.png`;
          qr.toFile(fileName, stJson2, (err) => {
            if (err) throw err;
            console.log(`Image ${fileName} générée avec succès`);
          });
        });
        ////////////
        res.status(200).json({ result })
      })
      .catch(error => res.status(500).json({ msg: error }));

  });

};

const getQrCodeOfTicket = ((req, res) => {
  Ticket.findOne({ _id: req.params.TicketID })
    .then(result => {
      if (!result) {
        return res.json({ msg: 'Ticket not found' });
      }
      // Extrait la sous-chaîne à partir du 21e caractère jusqu'à la fin
      const qrCodeSubstring = result.qr_code.substring(22);
      res.json({ qr_code: qrCodeSubstring });
    })
    .catch(() => res.json({ msg: 'Tickets not found' }));
});





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

const getTicket = (req, res) => {
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


// Fonction pour mettre à jour l'état du ticket après être scanné par le contrôleur
const CheckTicket = async (req, res) => {
  try {
    // Recherche du ticket par son ID
    const ticket = await Ticket.findOne({ _id: req.params.TicketID });

    if (ticket) {
      if (ticket.etat === false) {
        // Mettre à jour l'état du ticket à true
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.TicketID, { etat: true }, { new: true });
        console.log('Ticket a été marqué comme utilisé :', updatedTicket);
        return res.status(200).json({ message: 'Ticket mis à jour avec succès' });
      } else {
        console.log('Le ticket a déjà été utilisé.');
        return res.status(400).json({ message: 'Le ticket a déjà été utilisé.' });
      }
    } else {
      console.log('Ticket non trouvé.');
      return res.status(404).json({ message: 'Ticket non trouvé.' });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification et de la mise à jour de l\'état du ticket :', error);
    return res.status(500).json({ message: 'Erreur lors de la vérification et de la mise à jour de l\'état du ticket' });
  }
}


const ValiditeTicket = async (req, res) => {
  try {
    // Recherche du ticket par son ID
    const ticket = await Ticket.findOne({ _id: req.params.TicketID });
    if (!ticket) {
      console.log('Ticket non trouvé.');
      return res.status(404).json({ message: 'Ticket non trouvé.' });
    }

    // Accès à la voyage_id du ticket
    console.log("voyage id = " + ticket.voyage_id);

    // Recherche du voyage correspondant au ticket
    const voyage = await Voyage.findOne({ _id: ticket.voyage_id });
    if (!voyage) {
      console.log('Voyage non trouvé.');
      return res.status(404).json({ message: 'Voyage non trouvé.' });
    }

    // Vérification de la validité du ticket
    if (!ticket.etat && voyage.date.toISOString().substring(0, 10) === new Date().toISOString().substring(0, 10)) {
      console.log('Le ticket n\'est pas utilisé.');
      return res.status(200).json({ message: 'Le ticket n\'est pas utilisé.' });
    } else {
      console.log('Le ticket n\'est pas valide.');
      return res.status(400).json({ message: 'Le ticket n\'est pas valide.' });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du ticket :', error);
    return res.status(500).json({ message: 'Erreur lors de la vérification du ticket.' });
  }
}












module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  CheckTicket,
  ValiditeTicket,
  getQrCodeOfTicket
}