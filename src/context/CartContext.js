import {createContext,useState} from 'react'

const CartContext = createContext()

export function CartProvider ({children}){
    const [items,setItems] = useState([])
    let [count,setCount] = useState('')

    let cart = JSON.parse(localStorage.getItem("cart"))

    if(cart){
        let cartCount = Object.keys(JSON.parse(localStorage.getItem("cart"))).length
        if(cartCount > 0){
           count = cartCount
        }else{
            count = 0
        }
    }else{
        count = 0
    }

    const addToCart = (id,title,image,quantity,price) =>{
        setItems((prevState)=>[...prevState,{id,title,image,quantity,price}])
    }

    return(
        <CartContext.Provider value={{items,count,addToCart,setCount }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext
