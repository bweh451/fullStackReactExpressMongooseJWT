//Imported the following hooks and components for use below
import { useState, useEffect, useCallback, useRef } from "react"
import { Alert } from "react-bootstrap";
import useRegisterUser from "../../customHooks/useRegisterUser";
import useLogout from "../../customHooks/useLogout";
import CredForm from "./CredForm";
import RepoTable from "./RepoTable";

//Created the following functional component
const Repos = () => {

    //Destructures the following function and state component from the useRegisterUser custom hook
    const {showPassword, toggleShowPassBtn} = useRegisterUser();

    //Destructured the following from the useLogout hook
    const {navigate, logout} = useLogout();

    //Created the following state props
    const [response, setResponse] = useState("");
    const [searchError, setSearchError] = useState("");
    const [accessError, setAccessError] = useState("");
    const [credError, setCredError] = useState("");
    const [repo, setRepo] = useState([]);
    const [cred, setCred] = useState({name: "", username: "", password: "", OUAndDiv: {}});
    const [credId, setCredId] = useState("");
    const [repoSearch, setRepoSearch] = useState({OU: "", division: ""});
    const [showRepoTable, setShowRepoTable] = useState(false);
    const [showCredForm, setShowCredForm] = useState(false);

    //Gets token from sessionStorage
    const token = sessionStorage.getItem('token');

    //Set the following varaible to the useRef hook
    const bottomRef = useRef();

    //Created the following function in order to check if a user has access to the Repo page.
    //Wrapped function in useCallback hook in order to use it within useEffect hook.
    const checkRepoAccess = useCallback(async () => {

        try{

            //Fethes from the following endpoint using a get request
            const res = await fetch(`/repo/access`, {
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
        }

        //If an error occurs the error message gets set to the following state prop
        catch(err){
            setAccessError(err.message); 
            
            //And the user will be navigated back to the home page after 3 seconds
            setTimeout(() => {
                navigate("/");  
            }, 3000);
           
        }

        //Added the following dependencies
    }, [token, navigate])


    //useEffect hook executes the following on each render
    useEffect(() => {
        
        //If there is no token available the user will be 
        //redirected to the registration page
        if(!token){
            navigate("/register");
        }

        //Else the following function will be executed
        else {
            checkRepoAccess();

            //If the following state prop is truthy
            if(showCredForm){

                //It will scroll down to the element that has bottomRef set as its reference
                bottomRef.current.scrollIntoView();
            }
        }

        //Added the following dependencies
    }, [token, checkRepoAccess, showCredForm, navigate]);


    //Created a function that retrieves a single repo
    const getRepo = async () => {

        try{

            //Fetches from the following endpoint making use of a POST request
            const res = await fetch(`/repo`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(repoSearch)
            });

            //If the response is not between 200 and 400,
            //the response message gets set to a new Error and the error gets thrown
            if(!res.ok){
                const message = await res.json();
                const error = new Error(message.err);
                throw error;
            }

            //Else a result variable gets created and the following state props get set
            else{
                const result = await res.json();
                setRepo(result.repo);
                setShowRepoTable(true);
            }

        }
        //If an error occurs the error message gets set to the following state prop
        catch(err){
            setSearchError(err.message);    
        }
    }

    //Created the following function that enables a user to add new credentials to a specific repo
    const addCred = async () => {

        try{

            //Fetches from the following endpoint making use of a POST request
            const res = await fetch(`/repo/credentials`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(cred)
            });

            //Same as above function
            if(!res.ok){
                const message = await res.json();
                const error = new Error(message.err);
                throw error;
            }

            //Similar to above function
            else{
                const result = await res.json();
                setResponse(result.message);
                
            }

        }

        //Similar to above function
        catch(err){
            setCredError(err.message);        
        }
    }

    //Created a function that enables a user to update a specific credential within a specific repo
    const updateCred = async (id) => {

        try{

            //Fetches from the following endpoint making use of a PUT request
            const res = await fetch(`/repo/credentials/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(cred)
            });

            //Same as above function
            if(!res.ok){
                const message = await res.json();
                const error = new Error(message.err);
                throw error;
            }

            //Similar to above function
            else{
                const result = await res.json();
                setResponse(result.message);

            }

        }
        //Similar to above function
        catch(err){
            setCredError(err.message);        
        }
    }

    //Created function that handles changes within the repo search form
    const handleSearchChange = (e) => {

        //Gets the name and value of the current form input box
        const {name, value} = e.target;

        //If one of the input values is empty,
        //the following state props will get set
        if(value === ""){
            setShowRepoTable(false);
            setShowCredForm(false);
        }
        //Sets the following state prop's values where the key is equal to the name of the current form input box
        setRepoSearch({...repoSearch, [name]: value.toLowerCase()});

    }

    //Function that handles the changes within the credential form
    const handleCredFormChange = (e) => {

        //Gets the name and value of the current form input box
        const {name, value} = e.target;

         //Sets the following state prop's values where the key is equal to the name of the current form input box
        setCred({...cred, [name]: value});
    }

    //Created the following function that does the following when any form has been submitted
    const handleSubmit = (e) => {

        //Prevents page from reloading
        e.preventDefault();

        //Gets the id from the current form
        const { id } = e.target;

        //If the id equals the following,
        //the getRepo() function will be called
        if(id === "search"){
            getRepo();
        }

        //else if the id equals the following,
        //the addCred() function will be called
        else if (id === "addCred"){
            addCred();
        }

        //Else the following function will be called
        else{
            updateCred(credId);
        }
    }

    //Created a function that allows a user the close the credential form if its open
    const closeForm = () => {
        setShowCredForm(false);
    }

    //Created the following function that sets the following state props,
    //when the dismiss button of an alert is clicked
    const closeAlert = () => {
        setShowCredForm(false);
        setCredError("");
        setResponse("");
        getRepo();
    }

    //Created the following function when the add credentials button is clicked.
    //Sets the following state props
    const addBtn = () => {
        setCred({name: "", username: "", password: "", OUAndDiv: repoSearch});
        setShowCredForm(true);
    }

    //Created the following function when the update credentials button is clicked.
    //Sets the following state props
    const updateBtn = (index, id) => {
        setCred(repo[index]);
        setCredId(id);
        setShowCredForm(true);
        
    }

    console.log(credError);

    //Created the following variable for use below
    let element;

    //If the searchError state prop is falsey and the showRepotable state prop is truthy
    if(!searchError && showRepoTable){

        //The variable created above gets set to the following
        element = (
            <div className="flexContainer repoTableContainer">
                <RepoTable repo={repo} search={repoSearch} updateBtn={updateBtn} addBtn={addBtn}/>
            </div>
        )
        
    }

    //Else the variable created above will get set to the following
    else{
        element = (
            <div>
                <div className="flexContainer"><h3>Please enter the OU and division of the repository you'd like to view</h3></div>
            </div>
        )
        
    }

   

    //If the following state prop is falsey
    if(!accessError){

        //The following will be returned
        return(
            <>
                <div className="logout"><button onClick={logout}>Logout</button></div>
                <div className="flexContainer reposPage">
                    <div className="repoInnerContainer">

                        <div className="flexContainer"><h1>Repositories</h1></div>

                        {/* If the searError state prop is truthy the alert will be shown, onClose the searchError state prop will be set to an empty string */}
                        <Alert id="alert" style={{backgroundColor: '#f8c66f'}} show={searchError ? true : false} onClose={() => setSearchError("")} dismissible>{searchError}</Alert>
        
                        <div className="flexContainer repoSearch">
                            
                            <form id="search" onSubmit={handleSubmit}>
                                <label>OU</label>
                                <input type="text" name="OU" value={repoSearch.OU} onChange={handleSearchChange}/>
        
                                <label>Division</label>
                                <input type="text" name="division" value={repoSearch.division} onChange={handleSearchChange}/>
        
                                <button type="submit">Search</button>
                            </form>

                        </div>

                        {/* The element varaible gets displayed here */}
                        {element}

                        {/* If the following state prop is truthy, the following componenet will be displayed 
                        with the following state props and function passed in as props */}
                        {showCredForm ?
                            <div className="flexContainer credFormContainer"> 
                                <CredForm 
                                cred={cred} 
                                changeFunc={handleCredFormChange} 
                                submitFunc={handleSubmit} 
                                error={credError} 
                                response={response} 
                                closeFunc={closeAlert}
                                bottomRef={bottomRef}
                                showPass={showPassword}
                                showPassBtn={toggleShowPassBtn}
                                close={closeForm}
                                />
                            </div> :
                            
                            //Else nothing will be displayed
                            null
                        }
                    </div>
                </div>
            </>
        )
    }
    
    //Else the following will be returned
    else{
        return(
            <div className="flexContainer reposPage">
                <div className="errorContainer">
                    <div className="flexContainer"><h1>{accessError}</h1></div>
                    <div className="flexContainer"><h2>Redirecting in 3 seconds...</h2></div>
                </div>
            </div>
        )
    }
}

export default Repos;