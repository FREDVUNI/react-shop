import React,{useState,useEffect,useContext} from 'react'
import UserContext from '../../../context/UserContext'
import { useNavigate,Link } from "react-router-dom";
import {toast} from 'react-toastify'
import axios from 'axios'
import {url} from '../../../api'

const GetCategories = () => {
    let navigate = useNavigate();
    const [categories,setCategories] = useState([])
    const {auth} = useContext(UserContext)
    
    if(!auth){
        toast.success("You're not authorized.",{
            position: toast.POSITION.BOTTOM_RIGHT
        })

        navigate("/", { replace: true });
    } 

    useEffect(()=>{
        const getCategries = async () =>{
        const res = await axios.get(`${url}/categories`)
        const data = await res.data
        setCategories(data)
        }
        if(auth) getCategries()
    },[auth])

    if(categories.length > 0 && categories.length !== null){
    return (
    <div className="container">
    <div className="content">
        <Link to="/admin/category">
            <button className="btn-primary btn-">new category</button>
        </Link>

        <div className="row products mtop">
            {
            <>
            <table>
                <thead>
                <tr>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
                </thead>
                {categories.map((category,index)=>(
                <tbody key={index}>
                <tr>
                    <td>
                        <div className="cart-content">
                            <div  className="cart-item">
                                <p>{category.category}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span>
                            <Link to={`/admin/category/${category.id}`} style={{color:"#000"}}>
                                <i className="fas fa-pencil-alt"></i>
                            </Link>
                            <i className="fas fa-trash" style={{color:"#000",marginLeft:"10px"}}></i>
                        </span>
                    </td>
                </tr>
                </tbody>
                ))
                }
            </table>
            </>
            }
        </div>
    </div>
    </div>
    )
    }else{
    return(
    <div className="container">
    <div className="content">
        <div className="row row2">
            <div className="product-col4">
                <img src={"../images/404.svg"} alt="product"/>
            </div>
            <div className="col-single">
                <h3 id="details">There are currently no categories available.</h3>
            </div>
        </div>
    </div>
    </div>
    )
    }
}
export default GetCategories