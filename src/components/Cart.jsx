import React,{useContext,useEffect,useState} from 'react'
import "../App.css"
import Loader from './loader/Loader'
import UserContext from '../context/UserContext'
import CartContext from '../context/CartContext'
import { useNavigate } from "react-router-dom";

const Cart = () =>{
let navigate = useNavigate();
const { isLoggedIn }  = useContext(UserContext)
const { setCount }  = useContext(CartContext)

let order = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : ''
let history = [isLoggedIn,...order]

const [items,setItems] = useState(JSON.parse(localStorage.getItem("cart")))

const CompleteOrder = () =>{
    if(isLoggedIn){
        localStorage.setItem("order-history",JSON.stringify(history))
        localStorage.removeItem('cart');
        alert("Your order has been confirmed.")
        setCount(JSON.parse(localStorage.getItem("cart")) && Object.keys(JSON.parse(localStorage.getItem("cart"))).length)
        navigate("/", { replace: true });
    }else{
        navigate("/sign-in", { replace: true });
    }
}

const removeCartItem = (id) =>{
    let cart_ = JSON.parse(localStorage.getItem("cart"))
    let items  = cart_ && cart_.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(items));
    setItems(items)
    setCount(JSON.parse(localStorage.getItem("cart")) && Object.keys(JSON.parse(localStorage.getItem("cart"))).length)
}

useEffect(()=>{
    removeCartItem()
    // eslint-disable-next-line
},[])

if(items){
return (
<div className="container">
   <div className="content">
      <div className="row products mtop">
         {
         <>
         <table>
            <thead>
               <tr>
                   <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
               </tr>
            </thead>
            {items.map((product,index)=>(
            <tbody key={index}>
            <tr>
                <td>
                    <div className="cart-content">
                        <img src={product.image} alt="cart"/>
                        <div  className="cart-item">
                            <p>{product.product}</p>
                            <small>Price: ${product.price}</small>
                            <br/>
                            <span className="remove-Item" onClick={ ()=> removeCartItem(product.id) }>Remove</span>
                        </div>
                    </div>
                </td>
               <td>
                  <p>{product.quantity}</p>
               </td>
               <td className="cart-total">
                  <strong>$ {Number(product.price * product.quantity).toLocaleString()}</strong>
               </td>
            </tr>
            </tbody>
            ))
            }
         </table>
        <h2>Total: $ { items.reduce((a,v) =>  a = a + v.total , 0 )}</h2>

         <button className="btn-primary btn-" onClick={CompleteOrder}>complete order now</button>
         </>
         }
      </div>
   </div>
</div>
)
}else if(!items){
return(
<div className="container">
   <div className="content">
      <div className="row row2">
         <div className="product-col4">
            <img src={"../images/404.svg"} alt="product"/>
         </div>
         <div className="col-single">
            <h3 id="details">There are currently no items in the cart.</h3>
         </div>
      </div>
   </div>
</div>
)
}else{
    <div className="container">
        <div className="content">
            <div className="row row2">
                <div className="product-col4">
                    <Loader/>
                </div>
                <div className="col-single">
                    <h2 id="details">Products are loading ...</h2>
                </div>
            </div> 
        </div>
    </div>
}
}
export default Cart