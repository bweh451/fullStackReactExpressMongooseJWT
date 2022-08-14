//Imported the following component for use below
import { Alert } from "react-bootstrap";

//Created the following functional component
const CredForm = (props) => {

    //Destructures the following from the passing props
    const {cred, changeFunc, submitFunc, response, error, closeFunc, bottomRef, close, showPass, showPassBtn} = props;

    //Returns the following
    return(
        <div className="credFormInnerContainer">

            <Alert id="alert" style={{backgroundColor: '#bff86f', marginTop: '50px'}} show={response ? true : false} onClose={closeFunc} dismissible>{response}</Alert>
            <Alert id="alert" style={{backgroundColor: '#f8c66f', marginTop: '50px'}} show={error ? true : false} onClose={closeFunc} dismissible>{error}</Alert>

            {/* If the length of the object is less than 5 the h3 element's text will be set to "Add credentials" else it will be set to "Update credentials" */}
            <div className="flexContainer"><h3>{Object.keys(cred).length < 5 ? "Add credentials" : "Update credentials"}</h3></div>

             {/* If the length of the object is less than 5 the id of the form will be set to "addCred" else it will be set to "updateCred" */}
            <form className="credForm" id={Object.keys(cred).length < 5 ? "addCred" : "updateCred"} onSubmit={submitFunc}>

                <label>Credential name</label>
                <input type="text" name="name" value={cred.name} onChange={changeFunc} minLength="1" required/>

                <label>Username</label>
                <input type="text" name="username" value={cred.username} onChange={changeFunc} minLength="1" required/>

                <label>Password</label>
                <div className="credPassField">

                    {/* If the showPass prop is truthy the field will be changed to text field and if falsey it will change to a password field */}
                    <input type={showPass ? "text" : "password"} name="password" value={cred.password} onChange={changeFunc} minLength="1" required/>

                    {/* Button allows password field to be hidden or shown */}
                    <button type="button" onClick={showPassBtn}>{showPass ? "Hide" : "Show"}</button>

                </div>

                <button type="submit">Submit</button>
            </form>
            
            {/* Alows user to close the form */}
            {/* When the form is shown the page will automatically scroll down to this ref */}
            <button className="closeForm" onClick={close} ref={bottomRef}>Close form</button>

        </div>
    )

}

//Expors the component
export default CredForm;