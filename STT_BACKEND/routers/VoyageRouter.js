
const express = require('express')
const router = express.Router()

module.exports = {
    getVoyages,
    getVoyage,
    createVoyage,
    updateVoyage,
    deleteVoyage,
    getVoyageByTicket,
    getVoyageByVilleDateTime
 
 }= require('../controllers/VoyageController.js')

router.get('/',getVoyages)
router.get('/getVoyage/:VoyageID',getVoyage)
router.post('/',createVoyage)
router.put('/:VoyageID',updateVoyage)
router.delete('/deleteVoyage/:VoyageID', deleteVoyage)
router.get('/getVoyageByTicket/:VoyageID',getVoyageByTicket)
router.get('/getVoyageByvilleDateTime',getVoyageByVilleDateTime)

module.exports= router