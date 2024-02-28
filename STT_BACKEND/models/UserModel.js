const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const uuid = require('uuid');

// biha n7adedo kifeh nsayvoo les donnée fl base de donnée
const Schema = mongoose.Schema

const UserModel = new Schema({
    userName:String,
    matricule: {
        type: String,
        unique: true,
        default: function() {
            // Custom function to generate shorter matricule
            const shortMatricule = `${this.userName.slice(0, 8)}-${uuid.v4().slice(0, 4)}`;
            return shortMatricule;
        }
    },  
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