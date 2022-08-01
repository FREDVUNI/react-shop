import React,{useContext,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
import CartContext from '../context/CartContext'
import UserContext from '../context/UserContext'
import { useNavigate } from "react-router-dom";
import {url,setHeaders} from '../api'
import axios from 'axios'
import {toast} from 'react-toastify' 

const NavBar = () => {
    const [isMobile,setIsMobile] = useState(false)
    const { count }  = useContext(CartContext)
    const { isLoggedIn,auth,setAuth }  = useContext(UserContext)

    let [loggedIn,setLoggedIn] = useState(isLoggedIn)
    let navigate = useNavigate()

    const Logout = (e) =>{
        e.preventDefault()
        localStorage.removeItem('token');
        setLoggedIn(!isLoggedIn) 
        navigate("/", { replace: true });
        window.location.reload(false);
    }

    useEffect(()=>{
        const users = () =>{
            axios
            .get(`${url}/users`,setHeaders())
            .then((data)=>{
                setAuth(data.data)
            })
            .catch((error)=>{
                console.log(error.response || `There was an error.`)
                toast.error(error.response?.data,{
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
        }
        if(!setLoggedIn) users()
    },[setAuth])

    let user = auth.filter(user => user.email === loggedIn.email)
    if(!user) return navigate("/sign-in", { replace: true });
    
    return (
        <div className="container">  
        <div className="navbar">
            <div className="logo">
                <Link to="/">
                    <h4>Iconic<span>Online store...</span></h4>
                </Link>
            </div>
            <nav>
                <ul className={isMobile ? "nav-links-mobile":"nav-links"}
                    onClick = {()=>setIsMobile(false)}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li className="dropdown">
                        <Link to=""><i className="fa fa-user"></i> 
                            { loggedIn ?
                                loggedIn.username
                                :
                                "Account"
                            }
                            <i className="fa fa-chevron-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                            {
                            loggedIn ?
                            <>
                                <Link to="/profile">Profile</Link>
                                <Link to="" onClick={Logout}>Sign out</Link>
                            </>
                                :
                            <>
                                <Link to="/sign-in">Login</Link>
                                <Link to="/sign-up">Register</Link>
                            </>
                            }
                        </ul>
                    </li>
                    <Link to="/cart">
                        <i className="fas fa-shopping-cart cart">
                            <span id="itemsNum">
                                {count}
                            </span>
                        </i>
                    </Link>

                </ul>
            </nav>
            <button className="mobile-icon"
                    onClick={()=>setIsMobile(!isMobile)}
                >
                    {isMobile ? <i className="fas fa-times menu"></i>:<i className="fas fa-bars menu"></i>}
                </button>
        </div>
    </div>
    )
}

export default NavBar
