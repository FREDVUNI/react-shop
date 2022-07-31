import React,{useState,useContext,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import FormInput from './FormInput'
import "../App.css"
import CartContext from '../context/CartContext'
import UserContext from '../context/UserContext'
import axios from 'axios'
import {toast} from 'react-toastify' 
import {url} from '../api'
// import jwtDecode from 'jwt-decode'

const SignIn = () =>{
    const { isLoggedIn }  = useContext(UserContext)
    const { count }  = useContext(CartContext)
    const [error,setError] = useState("");

    let navigate = useNavigate()

    useEffect(()=>{
        if(isLoggedIn){
            navigate("/", { replace: true });
        }
    })

    const [values,setValues] = useState({
        email:"",
        password:"",
    })

    const inputs =[
        {
            id:1,
            label:"Email address",
            name:"email",
            type:"email",
            placeholder:"Enter email address",
            errorMessage:"Email address is invalid. ",
            required:true,
        },
        {
            id:2,
            label:"Password",
            name:"password",
            type:"password",
            placeholder:"Enter user password",
            errorMessage:"Password should be between 8 to 20 characters long. ",
            required:true,
            pattern:"^[A-Za-z0-9]{8,20}",
        }
    ]

    const onChange = (e) =>{
        setValues({...values,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) =>{
        setError(false)
        e.preventDefault();  
        let users = JSON.parse(localStorage.getItem('users'))

        if(users && users.some(user => user.email === values.email) && users.some(user => user.password === values.password)){

            let data = ({
                email:values.email,
                password:values.password,
            })

            axios.post(`${url}/users/sign-in`,data)
                .then((data)=>{
                    // console.log(data.data.token)
                    localStorage.setItem("token",data.data.token)
                    toast.success("You're logged in, welcome...",{
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    if(count){
                        navigate("/cart", { replace: true });
                    }else{
                        navigate("/", { replace: true });
                    }
                })
                .catch((error)=>{
                    console.log(error.response || `There was an error.`)
                    toast.error(error.response?.data,{
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                })
        }else{
            setError("Invalid email and password combination.")
        }

    }
    // console.log(values)
    return (
        <div className="content">
        <div className="row row2">   
            <div className="product-col4">
                <img src={"./images/log.svg"} alt="sign-in"/>
            </div>
            <div className="sign-col">
                <div className="form-box">
                    <h2>login</h2>
                    <div id="login-error"></div>
                    <form id="signIn" onSubmit={handleSubmit}>
                        <span className="e-span">{error}</span>
                        {
                            inputs && inputs.map((input)=>{
                                return(
                                    <FormInput key={input.id} 
                                        {...input} name={input.name}
                                        type={input.type} 
                                        placeholder={input.placeholder}
                                        value={values[input.name]}
                                        onChange={onChange}

                                    />
                                   
                                )
                            })
                        }
                        <button type="submit" className="btn">LOGIN</button>
                        <p>Don't have an account ? <Link to="/sign-up">Register here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
        
)
}

export default SignIn