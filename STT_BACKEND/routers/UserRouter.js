const express = require('express')
const router = express.Router()



const  { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser ,
    Login,
    Logout,
    UserLogin,
    getUserByMatricule
} = require('../controllers/UserController.js')

router.get('/',getUsers)
router.get('/getUser/:UserID',getUser)
router.get('/getUserByMatricule/:matricule',getUserByMatricule)
router.post('/',createUser)
router.put('/:UserID',updateUser)
router.delete('/deleteUser/:UserID', deleteUser)
router.post('/login', Login)
router.post('/logout', Logout)
router.post('/UserLogin', UserLogin)


module.exports= router