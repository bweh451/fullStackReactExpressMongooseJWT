//Created the following functional component
const LoginForm = (props) => {

    //Destructures the following from the props passed in
    const {login, changeFunc, submitFunc, showPass, showPassBtn} = props;

    //Returns the following
    return(
        <div>
            <div className="flexContainer"><h1>Login</h1></div>

            <div className="flexContainer innerContainer">
                <div>
                    <form className="loginForm" onSubmit={submitFunc}>

                        <label>Username</label>
                        <input type="text" name="username" value={login.username} onChange={changeFunc} minLength="1" required/>

                        <label>Password</label>

                        <div className="passwordField">

                            {/* If the showPass prop is truthy the field will be changed to text field and if falsey it will change to a password field */}
                            <input className="passInput" type={showPass ? "text" : "password"} name="password" value={login.password} onChange={changeFunc} minLength="1" required/>

                            {/* Button allows password field to be hidden or shown */}
                            <button type="button" onClick={showPassBtn}>{showPass ? "Hide" : "Show"}</button>
                            
                        </div>

                        <button id="loginSubmit" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default LoginForm;