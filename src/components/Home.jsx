import React,{useState,useEffect} from 'react'
import BannerSection from './BannerSection'
import ProductCard from './ProductCard'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios'
import {url} from '../api'

const Home = () => {
    const [products,setProducts] = useState([])
    const [filter,setFilter] = useState(products)
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        let loadProducts = true;

        const getProducts = async() =>{
            const res = await axios
            .get(`${url}/products`)
            setLoading(true)

            if(loadProducts){
                setProducts(await res.data);
                setFilter(await res.data);
                setLoading(false)
            }
            return ()=>{
                loadProducts = false;
            }
        }
        getProducts()
    },[])
    
    const filterProducts = (category) =>{
        const data = products.filter(product => product.category.category === category)
        setFilter(data)
    }

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
        </>
        )
    }

    return (
        <div className="container">
            <BannerSection/>
            <div className="content">
                <h2 className="title">Featured Products</h2>
                <div className="categories">
                    <div className="content">
                        <div className="row">
                            <span id="all" onClick={()=>setFilter(products)}>All</span>
                            <span id="all" onClick={()=>filterProducts('Jewellery')}>Jewellery</span>
                            <span id="all" onClick={()=>filterProducts('Men\'s clothing')}>Men's clothes</span>
                            <span id="all" onClick={()=>filterProducts('Women\'s clothing')}>Women's clothes</span>
                            <span id="all" onClick={()=>filterProducts('Electronics')}>Electronics</span>
                        </div>
                    </div>
                </div>
                <div className="row products">
                { loading ? <Loading/> :
                    filter.map((product)=>(
                        <ProductCard product={product} key={product.id}/>
                    ))
                }
                </div>
              </div>
        </div>
    )
}

export default Home
