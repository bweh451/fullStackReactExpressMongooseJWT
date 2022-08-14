//Imported the following for use below
const mongoose = require('mongoose');

//Created a schema for the Repos collection within the database
const ReposSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    username:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    OUAndDiv:{
        OU:{
            type: String,
            required: true
        },
        division:{
            type: String,
            required: true
        }
    }

});

//Exported the schema
const Repos = mongoose.model('Repos', ReposSchema);
module.exports = Repos;