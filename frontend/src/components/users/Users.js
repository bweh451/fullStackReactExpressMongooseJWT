//Imported the following hooks and components for user below
import { useEffect, useState, useCallback, useRef } from "react";
import { Alert } from "react-bootstrap";
import UsersTable from "./UsersTable";
import RegistrationForm from "../loginAndRegistration/RegistrationForm";
import useRegisterUser from "../../customHooks/useRegisterUser";
import useLogout from "../../customHooks/useLogout";
import UserRolesForm from "./UserRoleForm";

//Created the following functional component
const Users = () => {

    //Destructured the following state props and function from the useRegisterUser hook
    const {fields, setFields, user: singleUser, setUser: setSingleUser, 
        handleFieldsChange, addFields, removeFields, handleFormChange, 
        showPassword, toggleShowPassBtn} = useRegisterUser();
    
    //Destructured the following from the useLogout hook
    const {navigate, logout} = useLogout();

    //Created the following state props
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [userId, setUserId] = useState("");
    const [formError, setFormError] = useState("");
    const [response, setResponse] = useState("");
    const [showDetForm, setShowDetForm] = useState(false);
    const [showRoleForm, setShowRoleForm] = useState(false);
    const [userSearch, setUserSearch] = useState("");
    
    //Gets token from sessionStorage
    const token = sessionStorage.getItem('token');

    //Set the following variable to the useRef hook
    const bottomRef = useRef();
    
    //Created a function that retrieves all the users from the database
    const getAllUsers = useCallback(async () => {
       
        try{

            //Fetches from the following endpoint using a GET request.
            //Wrapped function in useCallback hook in order to use it within useEffect hook.
            const res = await fetch(`/users`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            //If the response is not between 200 and 400,
            //the response message gets set to a new Error and the error gets thrown
            if(!res.ok){
                const message = await res.json();
                const error = new Error(message.err);
                throw error;
            }

            //Else a result variable gets created and set to the json of the response,
            //and the following state prop gets set
            else{
                const result = await res.json();
                setUsers(result.users);
            }

        }

        //If there is an error the following state props gets set to the error message
        catch(err){
            setError(err.message); 
            
            //User gets redirected to the home page after 3 seconds
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }

        //Added the following dependencies
    }, [token, navigate]);

    //useEffect hook executes the following on each render
    useEffect(() => {

        //If there is no token, the user gets redirected to the register page
        if(!token){
            navigate("/register");
        }

        //Else the following function gets called
        else{
            getAllUsers();

            //If either of the following state props are truthy
            if(showDetForm || showRoleForm){

                //It will scroll down to the element that has bottomRef set as its reference
                bottomRef.current.scrollIntoView();
            }
        }

        //Added the following dependencies 
    }, [token, getAllUsers, navigate, showDetForm, showRoleForm]);

    //Created a function that enables a user to add a new user to the users collection within database
    const addUser = async () => {
        
        try{

            //Fetches from the following endpoint making use of a POST request
            const res = await fetch(`/users`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(singleUser)
            });
            
            //If the response is not between 200 and 400,
            //the response message gets set to a new Error and the error gets thrown
            if(!res.ok){
                const message = await res.json();
                const error = new Error(message.err);
                throw error;
            }

            //Else a result variable gets created and set to the json of the response,
            //and the following state prop gets set
            else{
                const result = await res.json();
                setResponse(result.message);
            }

        }

        //If there is an error the following state props gets set to the error message
        catch(err){
            setFormError(err.message);        
        }
    }

    //Created a function that enables a user to update the user details, 
    //of a user within the user collection of the database
    const updateUserDetails = async (id) => {

        try{

            //Fetches from the following endpoint making use of a PUT request
            const res = await fetch(`/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(singleUser)
                
            });

            //Same as function above
            if(!res.ok){
                const message = await res.json();
                const error = new Error(message.err);
                throw error;
            }

            //Same as function above
            else{
                const result = await res.json();
                setResponse(result.message);
            }

        }

        //Same as function above
        catch(err){
            setFormError(err.message);        
        }
    }

    //Created a function that enables a user to update the user role,
    //of a user within the user collection within the database
    const updateUserRoles = async (id) => {

        try{

            //Fetches from the following endpoint making use of a PUT request
            const res = await fetch(`/users/${id}/roles`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(singleUser)
                
            });

            //Same as function above
            if(!res.ok){
                const message = await res.json();
                const error = new Error(message.err);
                throw error;
            }

            //Same as function above
            else{
                const result = await res.json();
                setResponse(result.message);
            }

        }

        //Same as function above
        catch(err){
            setFormError(err.message);        
        }
    }


    //Created a function that enables a user to close a form
    const closeForm = () => {

        //Sets the following state props when clicked
        setShowRoleForm(false);
        setShowDetForm(false);
    }

    //Created the following function that sets the following state props,
    //when the dismiss button of an alert is clicked
    const closeAlert = () => {
        setResponse("");
        setFormError("");
        setShowDetForm("");
        setShowRoleForm("");
    }

    //Created a function that sets the following state props when the Add user button is clicked
    const addUserBtn = () => {
        setSingleUser({fName: "", lName: "", username: "", password: "", OUAndDiv: []});
        setFields([{OU: "", division: ""}]);
        setUserId("");
        setShowRoleForm(false);
        setShowDetForm(true);
    }

    //Created a function that sets the following state props when the Update user details button is clicked
    const updateDetailsBtn = (key, id) => {
        setSingleUser(users[key]);
        setFields(users[key].OUAndDiv);
        setUserId(id);
        setShowRoleForm(false);
        setShowDetForm(true);
    }

    //Created a function that sets the following state props when the Update user roles button is clicked
    const updateRolesBtn = (key, id) => {
        setSingleUser(users[key]);
        setUserId(id);
        setShowDetForm(false);
        setShowRoleForm(true);
    }
    
    //Created a function that handles changes and submits the checkbox form at the same time
    const handleAndSubmitCheckBox = (e) => {

        //Created the following variable set to the roles object from the singleUser state prop
        let userRoles = singleUser.roles;

        //Loops through each key of the roles object
        Object.keys(userRoles).forEach((key) => {
            
            //If the key is the same as the input field's name
            if(key === e.target.name){

                //The value gets set to true
                userRoles[key] = true;
            }

            //Else the value gets set to false
            else{
                userRoles[key] = false;
            }
        });

       //Sets the singleUser state prop's role value to userRoles varaible 
       setSingleUser({...singleUser, roles: userRoles});

       //Calls the following function
       updateUserRoles(userId);

    }

    //Created a function that handles the user details form submissions
    const handleSubmit = (e) => {

        //Prevents page from refreshing
        e.preventDefault();

        //Gets the id of the form being submitted
        const {id} = e.target;

        //If the id is equal to the following, the addUser function gets called
        if(id === "addUser"){
            addUser();
        }

        //Else the following function gets called
        else{
            updateUserDetails(userId);
        }
    }
    
    //Created a function that handles the changes within the filter input
    const handleSearchChange = (e) => {

        //Gets the value from the input
        const {value} = e.target;

        //Sets the following state prop to the value
        setUserSearch(value);
    }

    //If the following state prop is falsey
    if(!error){

        //The following will be returned
        return(
            <>
                <div className="logout"><button onClick={logout}>Logout</button></div>
                <div className="flexContainer usersPage">
                    <div>
                        <UsersTable 
                        users={users} 
                        changeFunc={handleSearchChange} 
                        search={userSearch} 
                        addUser={addUserBtn} 
                        updateDetails={updateDetailsBtn} 
                        updateRoles={updateRolesBtn}
                        />
        
                        {/* If the following state prop is truthy the following components will be 
                        displayed with the following state props and functions passed in as props */}
                        {showDetForm ?
                            <div className="flexContainer detailsFormContainer">
                                <div>
                                    <Alert style={{backgroundColor: '#bff86f', marginTop: '50px'}} show={response ? true : false} onClose={closeAlert} dismissible>{response}</Alert>
                                    <Alert style={{backgroundColor: '#f8c66f', marginTop: '50px'}} show={formError ? true : false} onClose={closeAlert} dismissible>{formError}</Alert>
            
                                    <RegistrationForm 
                                    fields={fields} 
                                    user={singleUser} 
                                    fieldsChange={handleFieldsChange} 
                                    formChange={handleFormChange} 
                                    submitFunc={handleSubmit}
                                    addFields={addFields}
                                    removeFields={removeFields}
                                    showPass={showPassword}
                                    showPassBtn={toggleShowPassBtn}
                                    close={closeForm}
                                    bottomRef={bottomRef}
                                    />
                                </div>
                                {/* Else nothing will be displayed */}
                            </div> : null
                        }
                        
                        {/* If the following state prop is truthy the following components will be 
                        displayed with the following state props and functions passed in as props */}
                        {showRoleForm ? 
                            <div className="flexContainer userRoleContainer">
                                <div>
                                    <Alert style={{backgroundColor: '#bff86f', marginTop: '50px'}} show={response ? true : false} onClose={closeAlert} dismissible>{response}</Alert>
                                    <Alert style={{backgroundColor: '#f8c66f', marginTop: '50px'}} show={formError ? true : false} onClose={closeAlert} dismissible>{formError}</Alert>
            
                                    <UserRolesForm user={singleUser} changeFunc={handleAndSubmitCheckBox} close={closeForm}  bottomRef={bottomRef}/>
                                </div>
                                {/* Else nothing will be displayed */}
                            </div> : null
                        }
                    </div>
                </div>
            </>
        )
    }
    //Else the following will be returned
    else{
        return(
            <div className="flexContainer usersPage">
                <div className="errorContainer">
                    <div className="flexContainer"><h1>{error}</h1></div>
                    <div className="flexContainer"><h2>Redirecting in 3 seconds...</h2></div>
                </div>
            </div>
        )
    }
    

}

//Exports the component
export default Users;