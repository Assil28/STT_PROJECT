
const express = require('express')
const router = express.Router()

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
    getHeureOfVoyages
 
 }= require('../controllers/VoyageController.js')

router.get('/',getVoyages)
router.get('/getVoyage/:VoyageID',getVoyage)
router.post('/',createVoyage)
router.put('/:VoyageID',updateVoyage)
router.delete('/deleteVoyage/:VoyageID', deleteVoyage)
router.get('/getVoyageByTicket/:VoyageID',getVoyageByTicket)
router.post('/getVoyageByvilleDateTime',getVoyageByVilleDateTime)
router.post('/getVoyagesByDate',getVoyagesByDate)
router.get('/p/:VoyageID',getPriceByVoyage)
router.post('/hours',getHeureOfVoyages)


module.exports= router