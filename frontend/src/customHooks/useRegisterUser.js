//Imported the following hook for use below
import { useState } from "react";

//Created the following cutom hook. 
//Since the registration form will be used within two components,
//the following custom hook makes it easier and cleaner to deal with the props and functions
//for the registration form
const useRegisterUser = () => {

    //Created the following state props
    const [fields, setFields] = useState([{OU: "", division: ""}]);
    const [user, setUser] = useState({fName: "", lName: "", username: "", password: "", OUAndDiv: []});
    const [showPassword, setShowPassword] = useState(false);

    //Created the following function
    const handleFieldsChange = (e, index) => {

        //Destructures the name and value from e.target
        const {name, value} = e.target;

        //Set the following variable equal to the fields state prop
        const data = [...fields];

        //Sets the field object at specific index's values where the key is equal to the name of the current form input box
        data[index][name] = value.toLowerCase();

        //Sets the fiels props to the data variable
        setFields(data);

        //Also set the OUAndDiv key of the user state props equal to the fields state prop
        setUser({...user, OUAndDiv: fields});
    }

    //The following function allows user to add another OU and division field,
    //to the form
    const addFields = () => {

        //Creates a new field object
        const object = {
            OU: '',
            division: ''
        }

        //Adds the new field object to the fields state prop
        setFields([...fields, object]);
    }

    //The following function allows a user to remove a specific OU and division field
    const removeFields = (index) => {

        //Sets the following varaible to the fields state prop
        const data = [...fields];

        //Removes the object at the specific index from the fields state prop
        data.splice(index, 1);

        //Sets the fields state prop to the data variable
        setFields(data);
    }

    //Created the following function that handles the changes of the rest of the registration form
    const handleFormChange = (e) => {

        //Gets the name and value of the current form input box
        const {name, value} = e.target;

        //Sets the following state prop's values where the key is equal to the name of the current form input box
        setUser({...user, [name]: value});
    }

    //Created the following function hides or shows a password within the password input field
    const toggleShowPassBtn = () => {

        //If the showPassword state prop is truthy 
        if(showPassword){

            //It'll set the following to false
            setShowPassword(false);
        }

        //Else it will set the following to true
        else{
            setShowPassword(true);
        }
    }

    //The hook returns all the state props and functions that will be used outside of the hook
    return {fields, user, setUser, handleFieldsChange, addFields, setFields, removeFields, handleFormChange, showPassword, toggleShowPassBtn}
}

//The hook gets exported
export default useRegisterUser;