//Imported the following hooks and components for use below
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import useLogout from "../customHooks/useLogout";
import reposImg from "../images/repos.jpg";
import usersImg from "../images/users.jpg";

//Created the following functional component
const Home = () => {

    //Destructured the following from the useLogout hook
    const {navigate, logout} = useLogout();

    //Gets token from sessionStorage
    const token = sessionStorage.getItem('token');

    //useEffect hook executes the following on each render
    useEffect(() => {

        //If there is no token the user will be redirected to the register page
        if(!token){
           navigate("/register");
        }

        //Added the following dependencies
    }, [token, navigate])


    //Returns the following
    return(
        <>
            <div className="logout"><button onClick={logout}>Logout</button></div>
            <div className="flexContainer homePage">
                <div className="homeContainer">
                    
                    <div className="flexContainer"><h1>Home</h1></div>

                    <p>Welcome to <strong>Cool Tech Repository management</strong>! Here you can view and edit all of our credential repositories! You can also view and edit the users of this very web application!</p>
                    
                    <div className="mainCardContainer">

                        <div className="cardContainer">
                            <Card style={{ width: '28rem' }}>
                                <Card.Img variant="top" src={reposImg} />
                                <Card.Body>
                                <Card.Title>Repositories</Card.Title>
                                    <Card.Text>
                                        If you'd like to search for, add and update (depending on your role) the credential repositories that you are assigned to you can do so 
                                        by clicking the button below.
                                    </Card.Text>

                                    {/* When button gets clicked the user will be redirected to the repos page */}
                                    <Link to="/repos"><Button variant="primary">Go to repositories page</Button></Link>
                                </Card.Body>
                            </Card>
                        </div>
                        
                        <div className="cardContainer">
                            <Card style={{ width: '28rem' }}>
                                <Card.Img variant="top" src={usersImg} />
                                <Card.Body>
                                    <Card.Title>Users</Card.Title>
                                    <Card.Text>
                                        If you'd like to view all, add, update or change the user role of the users for this web application, you can do so
                                        by clicking the button below.
                                    </Card.Text>

                                    {/* When button gets clicked the user will be redirected to the users page */}
                                    <Link to="/users"><Button variant="primary">Go to users page</Button></Link>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>

                    <div className="disclaimers">

                        <div className="flexContainer"><h3>Disclaimers</h3></div>
                        <p>
                            You will only be able to view the credential repositories that you have been assigned to. 
                            Only users with the management and admin roles are allowed to update repository information.
                        </p>

                        <p>Only admins can manipulate user information.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;