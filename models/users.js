//Imported the following for use below
const mongoose = require('mongoose');

//Created a user schema for the users collection within the database
const UsersSchema = mongoose.Schema({
    fName:{
        type: String,
        required: true
    },

    lName:{
        type: String,
        require: true
    },

    username:{
        type: String,
        require: true
    },

    password:{
        type: String,
        required: true
    },

    roles:{
        normal:{
            type: Boolean,
            default: true
        },
        management:{
            type: Boolean,
            default: false
        },
        admin:{
            type: Boolean,
            default: false
        }
    },

    OUAndDiv:[
        {
            OU:{
                type: String,
                required: true
            },
            division:{
                type: String,
                required: true
            }
        }
    ]

});

//Exported the schema
const Users = mongoose.model('User', UsersSchema);
module.exports = Users;