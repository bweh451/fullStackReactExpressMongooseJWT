//Imported the following hook for use below
import { useLocation } from "react-router-dom";

//Created a functional component
const RegistrationForm = (props) => {

    //Destructures the following from the props passed in
    const {fields, user, fieldsChange, formChange, submitFunc, addFields, removeFields, showPassBtn, showPass} = props;

    //Gets the bottomRef prop if there is one
    const bottomRef = props.bottomRef;

    //Created the following variable set to the useLocation hook
    const location = useLocation();

    //Created the following two variables for use below
    let id;
    let heading;

    //If the pathname is equal to the following
    if(location.pathname === "/users"){

        //Checks if object length is less than 6
        if(Object.keys(user).length < 6){

            //Sets the variables created above to the following
            id = "addUser";
            heading = "Add user";
        }

        //Else the variables created above get set to the following
        else{
            id = "updateDetails";
            heading = "Update user details";
        }
    }

    //Returns the following
    return(
        <div>

            {/* If the pathname is equal to the following the h1 element will get set to the heading variable else it will get set to "Register" */}
            <div className="flexContainer"><h1>{location.pathname === "/users"? heading : "Register"}</h1></div>

            {/* If the pathname is equal to the following, the id of the form will get set to the id variable  */}
            <form id={location.pathname === "/users"? id : ""} className="registerForm" onSubmit={submitFunc}>

                <label>First name</label>
                <input type="text" name="fName" value={user.fName} onChange={formChange} minLength="1" required/>

                <label>Last name</label>
                <input type="text" name="lName" value={user.lName} onChange={formChange} minLength="1" required/>

                <label>Username</label>
                <input type="text" name="username" value={user.username} onChange={formChange} minLength="1" required/>

                <label>Password</label>

                <div className="passwordField">

                    {/* If the showPass prop is truthy the field will be changed to text field and if falsey it will change to a password field */}
                    <input type={showPass ? "text" : "password"} name="password" value={user.password} onChange={formChange} minLength="1" required/>

                    {/* Button allows password field to be hidden or shown */}
                    <button type="button" onClick={showPassBtn}>{showPass ? "Hide" : "Show"}</button>
                    
                </div>

                <label>OU and division</label>

                {/* Maps each field object */}
                {fields.map((field, key) =>

                <div className="formFields" key={key}>

                    <input type="text" name="OU" placeholder="OU (eg. software reviews)" value={field.OU.toLowerCase()} onChange={(e) => fieldsChange(e, key)} minLength="1" required/>

                    <input className="divisionInput" type="text" name="division" placeholder="Division (eg. finance)" value={field.division.toLowerCase()} onChange={(e) => fieldsChange(e, key)} minLength="1" required/>

                    {/* The following button removes a OU and division field */}
                    <button type="button" onClick={() => removeFields(key)}>Remove</button>
                </div>
                )}

                <div className="registerFormBtns">

                    {/* The following button adds a new OU and division field */}
                    <button type="button" onClick={addFields}>Add OU and division</button>

                    {/* If the pathname is equal to the following, the text within the button will be "Submit" else it will be "Register" */}
                    <button id="registerSubmit" type="submit">{location.pathname === "/users"? "Submit" : "Register"}</button>
                </div>
            </form>
            
            {/* If the pathname is equal to the following, a button will get created else no button will be shown   */}
            {location.pathname === "/users" ? <button className="closeForm" ref={bottomRef} onClick={props.close}>Close form</button> : null}

        </div>

    )

}

export default RegistrationForm;