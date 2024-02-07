const express = require('express')
const router = express.Router()



const  { 
    getAllBus,
    getBus,
    createBus,
    updateBus,
    deleteBus
} = require('../controllers/BusController.js')

router.get('/',getAllBus)
router.get('/getBus/:BusID',getBus)
router.post('/',createBus)
router.put('/:BusID',updateBus)
router.delete('/deleteBus/:BusID', deleteBus)



module.exports= router