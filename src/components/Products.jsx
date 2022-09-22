import React,{useState,useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios'
import {url} from '../api'
import ProductCard from './ProductCard'

const Products = () =>{
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)

    let storeProducts = localStorage.setItem("all-products",JSON.stringify(products))

     useEffect(()=>{
        let loadProducts = true;

        const getProducts = async() =>{
            setLoading(true)
            const res = await axios
            .get(`${url}/products`) 

            if(loadProducts){
                setProducts(await res.data);
                setLoading(false)
            }
            return ()=>{
                loadProducts = false;
            }
        }
        if(storeProducts){
            setProducts(JSON.parse(localStorage.getItem("all-products")))
        }else{
            getProducts()
        }
    },[storeProducts])
    
    const Loading = () =>{
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

    return (
            <div className="container">
                <div className="content">
                    <h2 className="title-left">All Products</h2>
                    <div className="row products">
                        { loading ? <Loading/> :
                            products.map((product)=>(
                                <ProductCard product={product} key={product.id}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
}

export default Products