const express = require('express')
const router = express.Router()



const  { 
    createIntentPayment
} = require('../controllers/PaymentController.js')


router.post('/',createIntentPayment)




module.exports= router