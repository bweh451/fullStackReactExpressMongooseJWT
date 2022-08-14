//Imported the following for use below
const users = require("../models/users.js");
const jwt = require("jsonwebtoken");

//Created a function that registers a new user
const registerUser = async (req, res) => {

    try{

        //Destructures the following from the request body
        const {fName, lName, username} = req.body;

        //Checks if a user with the follwing props exists within the database
        const userExists = await users.exists({"fName": fName, "lName": lName, "username": username});

        //If the user does not exist
        if(!userExists){

            //Creates a new user
            const newUser = await users.create(req.body);
            
            //Sets the following object
            const payload = {
                userId: newUser._id,
                roles: newUser.roles,
                OUAndDiv: newUser.OUAndDiv
            }

            //Creates a JWT with the above object as its payload
            const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', {algorithm: 'HS256'});

            //Sends the following response to the frontend
            res.json({message: "You've successfully registered! Redirecting in 3 seconds...", token: token});
        }

        //Else the following will get sent to the frontend
        else{
            res.status(500).json({err: "User already exists! Go to the login page and log in with current details."});
        }
        
    }

    //If an error occurs the following will be sent to the frontend
    catch(err){
        res.status(500).json({err: "Something went wrong while registering! Please try again."});
    }

}

//Created a fucntion that enables a user to login
const loginUser = async (req, res) => {

    try{

        //Checks if the user exists within the database
        const user = await users.findOne({"username": req.body.username, "password": req.body.password}).exec();

        //If the user exists
        if(user){

            //Sets the following object
            const payload = {
                userId: user._id,
                roles: user.roles,
                OUAndDiv: user.OUAndDiv
            }
            
            //Creates a JWT with the object above as its payload
            const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', {algorithm: 'HS256'});
            
            //Sends the following to the frontedn
            res.json({message: "You've successfully logged in! Redirecting in 3 seconds...", token: token});
        }

        //Else the following will get sent to the frontend
        else{
            res.status(500).json({err: "User does not exist! Go to the registration page and register as a new account."})
        }

    }

    //If an error occurs the following will get sent to the frontend
    catch(err){
        res.status(500).json({err: "Something went wrong while logging in! Please try again."});
    }

}

//Created a function that retrieves all users from the database
const getAllUsers = async (req, res) => {

    //Gets JWT from request header
    const token = await req.headers['authorization'].split(' ')[1];
    
    try{

        //Verifys the JWT
        const decoded = jwt.verify(token, 'jwt-secret');

        //Destructures the following from the verified JWT
        const {roles} = decoded;

        //Checks if the admin value is true
        if(roles.admin){

            //If so it will retrieve all users from the database
            const allUsers = await users.find().exec();

            //The following gets sent to the frontend
            res.json({users: allUsers});
        }

        //Else the following gets sent to the frontend
        else{
            res.status(403).json({err: "You don't have permission to view users!"})
        }

    }

    //If an error occurs the following will get sent to the front end
    catch(err){
        res.status(401).json({err: "You are not authorized!"});
    }
}

//Created a function that adds a new user to the database
const addUser = async (req, res) => {

    //Same as function above
    const token = await req.headers['authorization'].split(' ')[1];

    try{

        //Same as function above
        const decoded = jwt.verify(token, 'jwt-secret');

        //Same as function above
        const {roles} = decoded;

        //Same as function above
        if(roles.admin){

            //Desctructures the following from the request body
            const {fName, lName, username} = req.body;

            //Checks if a user with the following props exists within the database
            const userExists = await users.exists({"fName": fName, "lName": lName, "username": username});

            //If the user does not exist
            if(!userExists){

                //If so, a new user get created
                await users.create(req.body);

                //Sends the following response to the frontend
                res.json({message: "You have succesfully added a new user!"});
            }

            //Else the following will be sent to the frontend
            else{
                res.status(500).json({err: "User already exists!"});
            }
            
        }

        //If the admin value is false, the following will get sent to the frontend
        else{
            res.status(403).json({err: "You do not have permission to add a user!"});
        }
       
    }

    //Same as function above
    catch(err){
        res.status(401).json({err: "You are unotharized!"});
    }

}

//Created a function updates the details of the user (excluding user role)
const updateUserDetails = async (req, res) => {

    //Same as function above
    const token = await req.headers['authorization'].split(' ')[1];

    try{

        //Same as function above
        const decoded = jwt.verify(token, 'jwt-secret');

        //Same as function above
        const {roles} = decoded;

        //Same as function above
        if(roles.admin){

            //Finds the user by their id and updates it with new information 
            await users.findOneAndUpdate({"_id": req.params.id}, req.body).exec();

            //Sends the following response to the frontend
            res.json({message: "Sucessfully updated user information!"});
        }

        //Else the following will be sent to the frontend
        else{
            res.status(403).json({err: "You don't have permission to update user information!"})
        }
    }

    //Same as function above
    catch(err){
        res.status(401).json({err: "You are not authorized!"});
    }
}

//Created a function that only updates the role of a user
const updateUserRole = async (req, res) => {

    //Same as function above
    const token = await req.headers['authorization'].split(' ')[1];

    try{

        //Same as function above
        const decoded = jwt.verify(token, 'jwt-secret');

        //Same as function above
        const {roles} = decoded;

        //Same as function above
        if(roles.admin){

            //Same as function above, but only updates the user role
            await users.findOneAndUpdate({"_id": req.params.id}, {"roles": req.body.roles}).exec();

            //Same as function above
            res.json({message: "Sucessfully updated user role!"});
        }

        //Similar to function above
        else{
            res.status(403).json({err: "You don't have permission to update user roles!"})
        }
    }

    //Same as function above
    catch(err){
        res.status(401).json({err: "You are not authorized!"});
    }
}

//Exports all the functions created above
module.exports = {
    registerUser: registerUser,
    loginUser: loginUser,
    getAllUsers: getAllUsers,
    addUser: addUser,
    updateUserDetails: updateUserDetails,
    updateUserRole: updateUserRole

};