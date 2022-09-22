import React,{useContext,useEffect} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import ProfileCard from './ProfileCard'

const Profile = () =>{
    const { isLoggedIn }  = useContext(UserContext)
    let user = isLoggedIn ? isLoggedIn : ''
    
    let navigate = useNavigate()

    useEffect(()=>{
        if(!isLoggedIn){
            navigate("/", { replace: true });
        }

    },[isLoggedIn,navigate])

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
                            <h2 className="left-">Profile</h2>
                            <ul className="-span">
                                {
                                    <ProfileCard key={user.email} profile={user}/>
                                }
                            </ul>
                            <h2>
                                <img 
                                    src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                                    alt="profile"
                                    style={{width:300,height:300,marginTop:30}}
                                    />
                            </h2>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        </>
    )
}

export default Profile