import './navbar.css';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';  
//import ReactDOM from 'react-dom';
import Button from "@material-ui/core/Button"
import {  Container} from "@material-ui/core"
import StyledMenu from "../Menu/Menu"

export default function Navbar({ user, logoutUser, isAuthenticated, intialized }){
    const navigate=useNavigate()
    const handleLogin =()=>{
        navigate("/login")
       //window.location.reload()
        
    }

    return (
         <Container style={{ backgroundColor: '#FFFFFF', height: '5vh'}}>
            <nav>
                <ul className="navbar-titles">
                    <li>
                       <Link className="navbar-titles" to="/">
                            Hīrā
                        </Link>
                    </li>
                    <li>
                        <Link className="navbar-titles" to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="navbar-titles" to="/give">
                            Give
                        </Link>
                    </li>
                    <li>
                        <Link className="navbar-titles" to="/tips">
                            Tips
                        </Link>
                    </li>
                    {/* user?.id? */}
                    {/* isAuthenticated is 'false'  by default so if true show the logout button if still false show 
                    the login and register button*/}
                    { !isAuthenticated? (
                    <StyledMenu logoutUser={logoutUser}/>
                    ):(<><Button className="login" variant="outlined" size='small' onClick={handleLogin}>
                     
                            Log In
                           
                    </Button>
                    <Button className="register" variant="outlined" size='small'>
                        <Link to="/register">
                            Register
                         </Link>
                    </Button></>)}
        
                </ul>
            </nav>
           </Container>
    )
}