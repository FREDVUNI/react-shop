import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import "../../../App.css"
import UserContext from '../../../context/UserContext'
import axios from 'axios'
import {toast} from 'react-toastify' 
import {url,setHeaders} from '../../../api'


const AddProduct = () =>{
    const { auth }  = useContext(UserContext)
    const [error,setError] = useState("");
    let navigate = useNavigate()

    if(!auth){
        toast.success("You're not authorized.",{
            position: toast.POSITION.BOTTOM_RIGHT
        })
        navigate("/", { replace: true });
    }

    const [values,setValues] = useState({
        category:"",
    })

    const handleSubmit = (e) =>{
        setError(false)
        e.preventDefault();  
        let data = ({
            category:values.category,
        })


    axios.post(`${url}/categories`,data,setHeaders())
        .then((data)=>{
        toast.success("Category has been created.",{
            position: toast.POSITION.BOTTOM_RIGHT
        }) 
        navigate("/admin/categories", { replace: true });
    })
    .catch((error)=>{
        console.log(error.response?.data || `There was an error.`)
        toast.error(error.response?.data.error,{
            position: toast.POSITION.BOTTOM_RIGHT
        })
    })

}
return (
<div className="content">
   <div className="row row2">
      <div className="-col">
         <div className="form-boxs">
            <div id="login-error"></div>
            <form id="signIn" onSubmit={handleSubmit} encType="multipart/form-data">
               <span className="e-span">{error}</span>
               <label htmlFor="category">Category</label>
               <input type="text" name="category" placeholder="Enter category" value={values.category}  onChange={(e)=>{setValues({...values,category:e.target.value})}} required/>
               <button type="submit" className="btn">ADD CATEGORY</button>
            </form>
         </div>
      </div>
   </div>
</div>
)
}
export default AddProduct