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
    const {auth,setAuth }  = useContext(UserContext)
    const [clients,getClients] = useState([])

    let navigate = useNavigate()

    const Logout = (e) =>{
        e.preventDefault()
        localStorage.removeItem('token');
        setAuth(!auth) 
        navigate("/", { replace: true });
        // window.location.reload(false);
    }

    useEffect(()=>{
        const users = () =>{
            axios
            .get(`${url}/users`,setHeaders())
            .then((data)=>{ 
                getClients(data.data)
                localStorage.setItem("users",JSON.stringify(clients))
                if(!auth) return navigate("/sign-in", { replace: true });

            })
            .catch((error)=>{
                console.log(error.response || `There was an error.`)
                toast.error(error.response?.data,{
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
        }
        if(auth) users()
    },[auth,setAuth,navigate,clients])

    
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
                            { auth ?
                                auth.username
                                :
                                "Account"
                            }
                            <i className="fa fa-chevron-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                            {
                            auth ?
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
