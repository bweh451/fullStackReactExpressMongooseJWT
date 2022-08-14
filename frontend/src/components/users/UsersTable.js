//Created the following functional component
const UsersTable = (props) => {

    //Destructures the following from the passed in props
    const {users, search, changeFunc, addUser, updateDetails, updateRoles} = props;

    //The following will be returned
    return(
        <div className="userTableContainer">

            <div className="flexContainer usersHeading"><h1>Users</h1></div>

            <div className="flexContainer">

                {/* Input field that allows user to filter the users either by firstname or lastname */}
                <div className="filterTable">
                    <label>Filter users by first name or last name</label>
                    <input type="text" value={search} onChange={changeFunc}/>
                </div>

            </div>
            <table className="userTable">
                <thead>
                    <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>OU and division</th>
                    <th>Update</th>
                    </tr>
                </thead>
                <tbody>

                    {/* If the firtname or lastname of a single user or multiple users within the database is equal to what the user as enetered
                    only those users or that user will be mapped to the table*/}
                    {users.filter((user) => 
                        user.fName.toLowerCase().includes(search.toLowerCase()) || 
                        user.lName.toLowerCase().includes(search.toLowerCase())
                      
                    // Maps the users to the table
                    ).map((usr, key) => 
                        <tr key={key}>
                            <td>{usr.fName}</td>
                            <td>{usr.lName}</td>
                            <td>{usr.username}</td>
                            <td>{usr.password}</td>

                            {/* Maps each OUAndDiv object to a list element */}
                            <td>{usr.OUAndDiv.map((OUDiv, listKey) =>
                                <li key={listKey}>{`${OUDiv.OU} - ${OUDiv.division}`}</li>
                            )}</td>
                            <td>
                                <div className="userTableUpdateBtns">

                                    {/* The following two functions takes in the key and id of the user as params */}
                                    <button type="button" onClick={() => updateDetails(key, usr._id)}>User details</button>
                                    <button type="button" onClick={() => updateRoles(key, usr._id)}>User role</button>
                                </div>
                            
                            </td>
                        </tr>
                    )} 
                </tbody>
            </table>
            <button type="button" className="addUserBtn" onClick={addUser}>Add new user</button>
        </div>
    )
}

export default UsersTable;