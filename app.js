//Imported the following for use below
const express = require("express");
const app = express();
const helmet = require("helmet");
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');

//Imported the following from the config.json file in order to connect to the database
const URI = require('./config/config.json').mongoURI;

//Imported the following modules in order to use its functions
const usersCont = require('./controllers/user.controller.js');
const reposCont = require('./controllers/repos.controller.js');

//App uses helmet in order to provide more security
app.use(helmet());

//App uses the following in order to parse json
app.use(express.json());

//Created a connection to the database
mongoose.connect(URI, () => {
    
    //When connected succesfully the following is displayed within the console
    console.log("Succesfully connected to database");
},

//If an error occurs during the connection the error will be logged to the console
err => console.log(err));

//Created the following endpoints below, each endpoint uses their own controller function from,
//either the users controller or repos controller

//All POST endpoints
app.post('/register', usersCont.registerUser);

app.post('/login', usersCont.loginUser);

app.post('/repo', reposCont.getSingleRepo);

app.post('/repo/credentials', reposCont.addCredentials);

app.post('/users', usersCont.addUser);

//All GET endpoints
app.get('/repo/access', reposCont.checkRepoAccess);

app.get('/users', usersCont.getAllUsers);

//All PUT endpoints
app.put('/repo/credentials/:id', reposCont.updateCredentials);

app.put('/users/:id', usersCont.updateUserDetails);

app.put('/users/:id/roles', usersCont.updateUserRole);

//Server starts on the port specified earlier
app.listen(port);