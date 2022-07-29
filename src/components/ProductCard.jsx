import React from 'react'
import {Link} from 'react-router-dom'
// import Ratings from './Ratings'

const ProductCard = ({product}) =>{
    return(
        <div className="col4 product"> 
            <Link to={`/product/${product.id}`} className="product-link" >
            <img src={product.image} alt={product.product.substring(0, 25)}/>
                <h2>
                    {product.product.length > 25 ?
                    `${product.product.substring(0, 25)}...` : product.product
                    }
                </h2>
            </Link>
            <p>${product.price}</p>
                {/* <Ratings value={product.rating.rate} text={`${product.rating.count} reviews`}/> */}
        </div>
    )
}

export default ProductCard