//Imported the following hook for use below
import { useNavigate } from "react-router-dom"

//Created a custom hook, in order to use it accross all pages
const useLogout = () => {

    //Sets the following variable to the useNavigate hook
    const navigate = useNavigate();

    //Created a function that will log a user out
    const logout = () => {

        //Removes the token from the sessionStorage
        sessionStorage.removeItem('token');

        //Redirects user to the register page
        navigate("/register");
    }

    //Returns the navigate varaible and logout function
    return {logout, navigate}
}

//Exports the custom hook
export default useLogout;