import React,{useContext,useEffect} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import ProfileCard from './ProfileCard'

const Profile = () =>{
    const { isLoggedIn }  = useContext(UserContext)
    let user = isLoggedIn ? isLoggedIn : ''
    
    // console.log(user)
    let navigate = useNavigate()
    useEffect(()=>{
        if(!isLoggedIn){
            navigate("/", { replace: true });
        }
    })
    return (
        <>
        <div className="container">
            <div className="content">
                <div className="row mtop">   
                    <div className="product-col4">
                        <img src={"./images/log.svg"} alt="profile"/>
                    </div>
                    <div className="sign-col">
                        <div className="form-box">
                            <i className="fas fa-user icon-user"></i>
                            <h2 className="left-">Profile</h2>
                            <ul className="-span">
                                {
                                    <ProfileCard key={user.email} profile={user}/>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        </>
    )
}

export default Profile