import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import Login from './Login';
import Signup from './Signup';
import axios from "axios";
import {ReactComponent as Logout} from '../icons/logout.svg';


function Navbar() 
{
    const userToken = JSON.parse(localStorage.getItem('expenseTrackerUserToken'));
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [user, setUser] = useState({});

    const fetchDataFromProtectedAPI = async (userToken) => 
    {
        try 
        {
            const config = {
                headers: {
                Authorization: `Bearer ${userToken}`,
                },
            };
            const response = await axios.get("http://localhost:3000/api/user", config);
            setUser(response.data.user);
            console.log(response.data.user);
        }
        catch (error)
        {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() =>
    {
        if (userToken)
        {
            fetchDataFromProtectedAPI(userToken);
        }
    }
    , [userToken]);


    const handleLogout = () =>
    {
        localStorage.removeItem('expenseTrackerUserToken');
        window.location.reload();
    }


    return (
        <div className="navbar_parent">
            <h1>Expense Tracker</h1>
            {userToken?
                <div className="profile_container">
                    <h4>{user?.name?.split(' ')[0]}</h4>
                    <Logout className="logout_icon" onClick={handleLogout}/>
                </div>
                :
                <div className="login_signup_container">
                    <button className="login_button" onClick={()=>setShowLoginForm(true)}>Login</button>
                    <button className="signup_button" onClick={()=>setShowSignupForm(true)}>Signup</button>
                </div>
            }

            {showLoginForm &&
                <div className="login_parent" ><Login/></div>
            }

            {showSignupForm &&
                <div className="signup_parent" ><Signup/></div>
            }
        </div>
    );
}

export default Navbar;