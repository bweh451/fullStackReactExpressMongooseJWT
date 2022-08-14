//Created the following functional component
const RepoTable = (props) => {

    //Destructures the following from the passed in props
    const { repo, addBtn, updateBtn } = props;

    //If the repo array's length is not equal to 0
    if(repo.length !== 0){

        //The following will be returned
        return(
            <div>
                <div className="flexContainer"><h3>{`${repo[0].OUAndDiv.OU.toUpperCase()} - ${repo[0].OUAndDiv.division.toUpperCase()}`}</h3></div>
                <table id="repoTable">
                    <thead>
                       <tr>
                        <th>Credential name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Update</th>
                       </tr>
                    </thead>
                    <tbody>

                        {/* Maps each repo object */}
                        {repo.map((cred, key) => 
                            <tr key={key}>
                                <td>{cred.name}</td>
                                <td>{cred.username}</td>
                                <td>{cred.password}</td>

                                {/* updateBtn function gets passed the key and cred._id as a param */}
                                <td><button type="button" onClick={() => updateBtn(key, cred._id)}>Credentials</button></td>
                            </tr>
                        )} 
                    </tbody>
                </table>
                <button type="button" className="addCredBtn" onClick={addBtn}>Add credentials</button>
            </div>
        )
    }

    //Else the following will be returned
    else{
        return(
            <div className="noCred">
                <div className="flexContainer"><h3>No credentials available!</h3></div>
                <div className="flexContainer"><h4>You can add some to this repository.</h4></div>
                <button type="button" className="addCredBtn" onClick={addBtn}>Add credentials</button>
            </div>
        )
       
    }
    

}

export default RepoTable;