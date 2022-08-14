//Created the following functional component
const UserRolesForm = (props) => {

    //Destructures the following from the passed in props
    const {user, changeFunc, close, bottomRef} = props;

    //Desctructures the following from the user prop
    const {roles} = user;

    //Returns the following
    return(
        <div className="userRoleInnerContainer">
            <div className="flexContainer"><h1>Update user role</h1></div>

            <div className="flexContainer"><h3>{`${user.fName} ${user.lName}`}</h3></div>

            <div className="userRoleForm">
                {/* If normal key's (found within roles object) values is true, the checkbox will be checked */}
                <div className="flexContainer"><input type="checkbox" name="normal" value={roles.normal} onChange={changeFunc} checked={roles.normal ? true : false}/>Normal</div>

                {/* Same as above but checking the management key's value */}
                <div className="flexContainer"><input type="checkbox" name="management" value={roles.management} onChange={changeFunc} checked={roles.management ? true : false}/>Management</div>

                {/* Same as above but checking the admin key's value */}
                <div className="flexContainer"><input type="checkbox" name="admin" value={roles.admin} onChange={changeFunc}  checked={roles.admin ? true : false}/>Admin</div>
            </div>

            {/* Allows user to close the form */}
            {/* When the form is shown the page will automatically scroll down to this ref */}
            <button className="closeForm" onClick={close} ref={bottomRef}>Close form</button>
          
        </div>
    )
}

export default UserRolesForm;