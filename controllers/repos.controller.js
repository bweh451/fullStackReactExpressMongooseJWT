//Imported the following for use below
const repos = require("../models/repos.js");
const jwt = require("jsonwebtoken");

//Created a function that checks if the user is allowed to access repo information
const checkRepoAccess = async (req, res) => {

    //Same as function above
    const token = await req.headers['authorization'].split(' ')[1];

    try{

        //Same as function above
        const decoded = jwt.verify(token, 'jwt-secret');

        //Same as function above
        const {roles} = decoded;

        //Same as function above
        if(roles.normal || roles.management || roles.admin){
            
            //If true the following status code will get sent to the frontend
            res.sendStatus(200);
        }

        //Else the following will get sent to the frontend
        else{
            res.status(403).json({message:"You do not have permission to view any repos!"});
        }
        
    }

    //Same as function above
    catch(err){
        res.status(401).json({err: "You are unotharized!"});
    }
} 

//Created a function that gets a specific repository from the database
const getSingleRepo = async (req, res) => {

    //Created a 
    let repoObj = {};
    
    //Same as function above
    const token = await req.headers['authorization'].split(' ')[1];

    try{

        //Same as function above
        const decoded = jwt.verify(token, 'jwt-secret');

        //Destructures the OUAndDiv array from the verified token
        const {OUAndDiv} = decoded;

        //Loops throught the array
        for(let i = 0; i < OUAndDiv.length; i++){

            //Checks if the values of the keys mathes the values of the request body
            if(OUAndDiv[i].OU === req.body.OU && OUAndDiv[i].division === req.body.division){

                //If so the following variable gets set to the found repo
                const singleRepo = await repos.find({"OUAndDiv": {"OU": req.body.OU, "division": req.body.division}}).exec();
                
                //The following object gets created
                repoObj ={
                    repo: singleRepo
                }

                //Breaks out of the loop
                break;
            }

        }

        //If the objects length is equal to zero
        if(Object.keys(repoObj).length === 0){

            //The following will get sent to the frontend 
            res.status(403).json({err: "You don't have permission to access this repo! You can only access the repos you are assigned to."})
        }

        //Else the repo object created earlier will be sent to the frontend
        else{
            res.json(repoObj);
        }
        
    }

    //Same as function above
    catch(err){
        res.status(401).json({err: "You are unotharized!"});
    }
}

//Created a function that adds a new credential to the repos collection
const addCredentials = async (req, res) => {
    
    //Gets JWT from the request header
    const token = await req.headers['authorization'].split(' ')[1];

    try{

        //Verify's the token
        const decoded = jwt.verify(token, 'jwt-secret');

        //Desctructures the roles object from the verified token
        const {roles} = decoded;

        //Checks if either of the following roles are set to true
        if(roles.normal || roles.management || roles.admin){

            //If so, the following gets destructured from the request body
            const { name, username } = req.body;

            //Checks if the credential exists
            const credExists = await repos.exists({"name": name, "username": username});

            //If the credential does not exist
            if(!credExists){

                //Creates a new credential by creating a new repo instance
                await repos.create(req.body);

                //Sends the following response to the frontend
                res.json({message: "Sucessfully added new credentials!"});
            }

            //Else the following gets sent to the frontend
            else{
                res.status(500).json({err: "The credentials already exists!"});
            }
           
        }

        //If neither of the user roles are set to true, the following response gets sent to the frontend
        else{
            res.status(403).json({err: "You don't have permission to add new repo credentials!"})
        }

    }

    //If an error occurs the following will be sent to the frontend
    catch(err){
        res.status(401).json({err: "You are unotharized!"});
    }

}

//Created a function that 
const updateCredentials = async (req, res) => {

    //Same as function above
    const token = await req.headers['authorization'].split(' ')[1];

    try{

        //Same as function above
        const decoded = jwt.verify(token, 'jwt-secret');

        //Same as function above
        const {roles} = decoded;

        //Checks if either of the following key's values are true
        if(roles.admin || roles.management){

            //If so
            //Finds the repo credential by it's id and updates it
            await repos.findOneAndUpdate({"_id": req.params.id}, req.body).exec();


            //Sends the following response to the frontend
            res.json({message: "Sucessfully updated repo credentail information!"});
        }

        //Else the following will be sent to the frontend
        else{
            res.status(403).json({err: "You don't have permission to update any repo credentials!"})
        }
    }

    //Same as function above
    catch(err){
        res.status(401).json({err: "You are not authorized!"});
    }
}

//Exports all the function created above
module.exports = {
    addCredentials: addCredentials,
    checkRepoAccess: checkRepoAccess,
    getSingleRepo: getSingleRepo,
    updateCredentials: updateCredentials
};
