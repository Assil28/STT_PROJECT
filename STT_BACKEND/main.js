console.log("Aaselemmaaa");

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3800;

const cors= require('cors')

app.use(logger('dev'));
app.use(cookieParser());
// cros pour que le front end puisse acceder au backEnd (car les deux non pas le meme port) 
app.use(cors({
    credentials:true, // pour qu'il puisse acceder au cookie pour s'authentifier
    origin:['http://localhost:4200']
})) 
// bodyParser pour récupérer les données avec post/put
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*
    L'appel de nos routers

*/
// pour utiliser les routes de user
const user_routes = require('./routers/UserRouter.js');
app.use('/api/users', user_routes);

// pour utiliser les routes de Bus
const bus_routes = require('./routers/BusRouter.js');
app.use('/api/bus', bus_routes);

// pour utiliser les routes de voayges
const voyage_routes = require('./routers/VoyageRouter.js');
app.use('/api/voyages', voyage_routes);

// pour utiliser les routes de tickets
const ticket_routes = require('./routers/TicketRouter.js');
app.use('/api/tickets', ticket_routes);


// méthode pour se connecter à la base de données avec un fichier env
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(port, () => console.log(`server running on port ${port}`)))
    .catch((error) => console.log('Error', error));

