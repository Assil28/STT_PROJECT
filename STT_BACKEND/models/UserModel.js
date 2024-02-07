const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


// biha n7adedo kifeh nsayvoo les donnée fl base de donnée
const Schema = mongoose.Schema

const UserModel = new Schema({
    userName:String,
    email:String,
    password: {
        type: String,
        required: true
    },
    phone_number:String,
    birthday:Date,
    role:String,
    cin:String
})



const User = mongoose.model('User', UserModel)

module.exports = User