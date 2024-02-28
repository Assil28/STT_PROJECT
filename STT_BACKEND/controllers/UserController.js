const User = require('../models/userModel.js'); // Updated import statement to match the actual filename

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const SECRET_KEY="STT"


const getUsers = ((req, res) => {
    User.find({})
        .then(result => res.json({ result }))
        .catch(() => res.json({ msg: 'Users not found' }))
})


const getUser = (req, res) => {
    User.findOne({ _id: req.params.UserID })
        .then(result => {
            if (!result) {
                return res.json({ msg: 'User not found' });
            }
            res.json({ result });
        })
        .catch(error => res.json({ msg: 'Error finding User', error }));
};
const getUserByMatricule = (req, res) => {
    User.findOne({ matricule: req.params.matricule })
        .then(result => {
            if (!result) {
                return res.json({ msg: ' search by matricule :User  not found' });
            }
            res.json({ result });
        })
        .catch(error => res.json({ msg: 'Error finding User', error }));
};


const deleteUser = ((req, res) => {
    User.findOneAndDelete({ _id: req.params.UserID })
        .then(result => {
            if (!result) {
                return res.json({ msg: 'User not found' });
            }
            res.json({ result });
        })
        .catch(error => res.status(500).json({ msg: 'Error deleting User', error }));
})

const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { cin: req.body.cin }] });

        if (existingUser) {
            return res.status(400).send("User already registered");
        } else {
            const salt = await bcrypt.genSalt(10);

            // Hacher le mot de passe avec le sel
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Remplacer le mot de passe en texte brut par le mot de passe haché
            req.body.password = hashedPassword;

            // Assuming matricule is automatically generated
            const token = jwt.sign({ _id: req.body._id }, SECRET_KEY);
            const result = await User.create(req.body);
            
            res.status(200).json({ user: result, token });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
const updateUser = (req, res) => {
    const { userName,  email, password, phone_number, birthday, role, cin } = req.body;

    User.findOneAndUpdate(
        { _id: req.params.UserID }, // Filtre pour sélectionner le document à mettre à jour
        {
            userName,  
            email,
            password,
            phone_number,
            birthday,
            role,
            cin 
        },
        { new: true } // Option pour retourner le document mis à jour plutôt que l'ancien
    )
    .then(result => {
        if (result) {
            res.json({ result });
        } else {
            res.json({ msg: 'User not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    });
};
const Login = async (req, res) => {
    try {
        const existingUser = await User.findOne({ matricule: req.body.matricule });

        if (!existingUser) {
            return res.status(401).json({ error: "User matricule does not exist" });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, existingUser.password);

        if (isPasswordMatch) {
            const token = jwt.sign({ _id: existingUser._id, role:existingUser.role }, SECRET_KEY);

            // Mettez le token dans le cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            console.log(existingUser);
            return res.status(200).json({ message: "Login Successful" });
        } else {
            return res.status(401).json({ error: "Wrong password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const UserLogin = async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];

        // on va decoder le token
        // les claims bch traja3 l id w lwa9et l tesna3 fih token
        const claims = jwt.verify(cookie, SECRET_KEY);

        if (!claims) {
            return res.status(401).send('Unauthorized');
        }

        const user = await User.findOne({ _id: claims._id });

        // tw bch na7i affichage l password mel user
        const { password, ...data } = await user.toJSON();

        res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};


const Logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 });
    res.json({ message: 'Successfully logged out' }); // Retourne une réponse JSON vide
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    Login,
    Logout,
    UserLogin,
    getUserByMatricule
}