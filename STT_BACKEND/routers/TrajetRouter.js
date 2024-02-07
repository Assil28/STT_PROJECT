
const express = require('express')
const router = express.Router()

module.exports = {
    getTrajets,
    getTrajet,
    deleteTrajet,
    createTrajet,
    updateTrajet,
   
 
 }= require('../controllers/TrajetController.js')

router.get('/',getTrajets)
router.get('/getTrajet/:TrajetID',getTrajet)
router.post('/',createTrajet)
router.put('/:TrajetID',updateTrajet)
router.delete('/deleteTrajet/:TrajetID', deleteTrajet)


module.exports= router