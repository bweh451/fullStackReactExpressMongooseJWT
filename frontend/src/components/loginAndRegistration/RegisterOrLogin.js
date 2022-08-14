//Imported the following hooks and components for use below
import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import RegistrationForm from "./RegistrationForm";
import useRegisterUser from "../../customHooks/useRegisterUser";
import LoginForm from "./LoginForm";

//Created the following functional component
const RegisterOrLogin = () => {

    //Deconstructed the following state props and functions from the custom useRegisterUser hook
    const {fields, user, handleFieldsChange, addFields, 
        removeFields, handleFormChange, showPassword, toggleShowPassBtn} = useRegisterUser();
    
    //Created the following state props
    const [login, setLogin] = useState({username: "", password: ""});
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
   
    //The following gets the pathname of the current location
    const location = useLocation()
    const {pathname} = location;
    
    //Set the following varibale to the useNavigate hook in order to navigate to different web pages
    const navigate = useNavigate();
    
    //Set the following variable to the session storages 'token' item
    const token = sessionStorage.getItem('token');
    
    //useEffect hook executes the following on each render
    useEffect(() => {

        //If the token varaible and response state prop is truthy
        if(token && response){

            //Redirects user to home page after 3 seconds
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }

        //Else if the token variable is truthy and response varible is falsey
        else if(token && !response){

            //Redirects user to home page instantly
            navigate("/");
        }

        //Added the following dependencies
    }, [token, response, navigate])


    //Function that handles the changes within the login form's input boxes
    const handleLoginChange = (e) => {
        //Gets the name and value of the current form input box
        const {name, value} = e.target;

        //Sets the following state prop's values where the key is equal to the name of the current form input box
        setLogin({...login, [name]: value});
    }

    //Function that executes the following when form is submitted
    const handleSubmit = (e) => {

        //Prevents page from refreshing
        e.preventDefault();

        //If the pathname is equal to the following
        if(pathname === "/register"){

            //This function will be called.
            registerUser();
        }

        //Else the following function will be called
        else{
            loginUser(); 
        }
    }

    //Created a function that registers a new user
    const registerUser = async () => {

        try{
            //Fetches from the following endpoint making use of a post request
            const res = await fetch(`/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            });

            //If the response is not between 200 and 400, 
            //it'll create a new error with the response message and throw it
            if(!res.ok){
                const message = await res.json();
                const error = new Error(message.err);
                throw error;
            }

            //Else if will set the response to the message received, 
            //and save the JWT received inside of session storage.
            else{
                const result = await res.json();
                setResponse(result.message);
                sessionStorage.setItem('token', result.token);
            }

        }

        //If an error occurs the following state prop gets set
        catch(err){
            setError(err.message);      
        }
        
    }

    //Function that enables an existing user to log in,
    //works the same as the register function above
    const loginUser = async () => {

        try{

            const res = await fetch(`/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(login)
            });

            if(!res.ok){
                const message = await res.json();
                const error = new Error(message.err);
                throw error;
            }
            else{
                const result = await res.json();
                setResponse(result.message);
                sessionStorage.setItem('token', result.token);
            }

        }
        catch(err){
            setError(err.message);
        }
        
    }

    //If the pathname is equal to the following
    if(pathname === "/register"){

        //The following will be returned
        return(
            <div className="flexContainer registerPage">
                <div>

                    <div className="loginRegAlert">

                        {/* The Alert will show if the response state prop is truthy */}
                        <Alert style={{backgroundColor: '#bff86f'}} show={response ? true : false}>{response}</Alert>

                         {/* The Alert will show if the error state prop is truthy and onClose it will set the error state prop to an empty string */}
                        <Alert style={{backgroundColor: '#f8c66f'}} show={error ? true : false} onClose={() => setError("")} dismissible>{error}</Alert>
                    </div>

                    {/* Displays tje Registration form component passing in the following functions and state props as props */}
                    <div className="registerFormContainer">
                        <RegistrationForm 
                        fields={fields} 
                        user={user} 
                        fieldsChange={handleFieldsChange} 
                        formChange={handleFormChange} 
                        submitFunc={handleSubmit}
                        addFields={addFields}
                        removeFields={removeFields}
                        showPass={showPassword}
                        showPassBtn={toggleShowPassBtn}
                        />

                        <div className="flexContainer otherAcc"><span>Already have an account? <Link to="/login" style={{color: '#f8e16f'}}>Login</Link></span></div>
                    </div>
                </div>
            </div>
        )
    }

    //Else the following will be returned
    else{

        return(
    
            <div className="flexContainer loginPage">
                
                <div className="loginInnerContainer">
                    <div className="flexContainer loginRegAlert">

                        {/* Sames as the Alets above */}
                        <Alert style={{backgroundColor: '#bff86f'}} show={response ? true : false}>{response}</Alert>
                        <Alert style={{backgroundColor: '#f8c66f'}} show={error ? true : false} onClose={() => setError("")} dismissible>{error}</Alert>
                    </div>

                     {/* Displayes tje Login form component passing in the following functions and state props as props */}
                    <div className="loginFormContainer">
                        <LoginForm 
                        login={login} 
                        changeFunc={handleLoginChange} 
                        submitFunc={handleSubmit} 
                        showPass={showPassword}
                        showPassBtn={toggleShowPassBtn}
                        />
                    <div className="flexContainer otherAcc"><span>Don't have an account? <Link to="/register" style={{color: '#f8e16f'}}>Register</Link></span></div>
                    </div>
            
                </div>
            </div>
            
        )
    }
        
}

//Exports the component
export default RegisterOrLogin;