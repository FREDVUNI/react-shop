import React,{useState,useContext,useEffect} from 'react'
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
const [categories,setCategories] = useState([])

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
    getCategries()
},[])

const [values,setValues] = useState({
    product:"",
    price:"",
    description:"",
    image:"",
    categoryId:"",
})

const handleSubmit = (e) =>{
    setError(false)
    e.preventDefault();  
    let data = new FormData();
    data.append('product', values.product);
    data.append('price', values.price);
    data.append('description', values.description);
    data.append('image', values.image);
    data.append('categoryId', Number(values.categoryId));
    console.log(data)

axios.post(`${url}/products`,data,setHeaders())
    .then((data)=>{
    toast.success("Product has been created.",{
        position: toast.POSITION.BOTTOM_RIGHT
    }) 
    navigate("/", { replace: true });
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
               <label htmlFor="product">Product</label>
               <input type="text" name="product" placeholder="Enter product" value={values.product}  onChange={(e)=>{setValues({...values,product:e.target.value})}} required/>
               <label htmlFor="price">Price</label>
               <input type="text" name="price" placeholder="Enter price" value={values.price}  onChange={(e)=>{setValues({...values,price:e.target.value})}} required/>
               <label htmlFor="category">Category</label>
               <select name="categoryId"  onChange={(e)=>{setValues({...values,categoryId:e.target.value})}}>
                    <option>choose category</option>
                    {
                        categories && categories.map((category)=>(
                            <option key={category.id}  value={category.id}>{category.category}</option>
                        ))
                    }
               </select>
               <label htmlFor="description">Description</label>
               <textarea cols="40" rows="10" name="description" placeholder="Enter product description" value={values.description}  onChange={(e)=>{setValues({...values,description:e.target.value})}} required></textarea>
               <label htmlFor="image">Image</label>
               <input type="file" name="image" value={values.image}  onChange={(e)=>{setValues({...values,image:e.target.files[0]})}} required/>
               <button type="submit" className="btn">ADD PRODUCT</button>
            </form>
         </div>
      </div>
   </div>
</div>
)
}
export default AddProduct