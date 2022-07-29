import React,{useEffect,useState} from 'react'
import '../App.css'
import ProductCard from './ProductCard'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios'
import {url} from '../api'

const Product = () => {
    let {id} = useParams() 
    
    const [product,setProduct] = useState([])
    const [related,setRelated] = useState([])
    const [loading,setLoading] = useState(false)
    
    
    const single = localStorage.setItem("singleProduct",JSON.stringify(product))

    useEffect(()=>{
        const getProduct = async() =>{
            const response = await axios
            .get(`${url}/products/${id}`)
            setProduct(await response.data)
            setLoading(false)
        }

        const relatedProducts = async() =>{
            setLoading(true)
            const response = await axios
            .get(`${url}/products`)
            setRelated(await response.data)
            setLoading(false)
        }
        if(single){
            setProduct(JSON.parse(localStorage.getItem("singleProduct")))
        }else{
            getProduct();
        }

        relatedProducts(window.scrollTo(0, 0));
    },[id,single])
    const products = related && product && related.filter(p => p.category.id === product.categoryId)
    const Loading = () =>{
        return(
        <>
            <div className="product-col4">
                <Skeleton height="400px"/>
            </div>
            <div className="col-single">
                <Skeleton height="30px" width="170px"/>
                <Skeleton height="30px" width="100px"/>
                <Skeleton height="30px" width="150px"/>
                <Skeleton height="200px"/>
                <Skeleton height="40px" width="100px"/>
            </div>
        </>
        )
    }

    const RelatedLoad = () =>{
        return(
        <>
            <div className="col4 product"> 
                <Skeleton height={350}/>
            </div>
            <div className="col4 product"> 
                <Skeleton height={350}/>
            </div>
            <div className="col4 product"> 
                <Skeleton height={350}/>
            </div>
            <div className="col4 product"> 
                <Skeleton height={350}/>
            </div>
        </>
        )
    }
    if(product && product.id === Number(id)){
    return (
        <div className="container">
            <div className="content">
                <div className="row row2">
                {loading ? <Loading/>:
                <>
                <div className="product-col4">
                    <img src={product.image} alt={product.product}/>
                </div>
                <div className="col-single">
                    <h2>{product.product}</h2>
                    <h4>{product.price}</h4>
                    <h3 id="details">Description</h3>
                    <p>{product.description}</p>
                    {/* <input type="number" value="4" min="1" id="cart-input"/> */}
                    <button className="btn- cartBtn"><i className="fa fa-shopping-cart"></i> Add to cart</button>
                </div>
                </>
                }
            </div>
            <h2 className="title-left">Related Products</h2>
                <div className="row products">
                    { loading ? <RelatedLoad/> :
                         products && products.map((product)=>{
                            return(
                                <ProductCard product={product} key={product.id}/>
                            )
                        })                    
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
                    {loading ? <Loading/>:
                    <>
                    <div className="product-col4">
                            <img src={"../images/404.svg"} alt="product"/>
                        </div>
                        <div className="col-single">
                            <h3 id="details">Product was not found.</h3>
                        </div>
                    </>
                    }
                    </div> 
               </div>
           </div>
        )
    }
}

export default Product
