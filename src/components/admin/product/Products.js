import React,{useState,useEffect,useContext} from 'react'
import UserContext from '../../../context/UserContext'
import { useNavigate,Link } from "react-router-dom";
import {toast} from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import {url} from '../../../api'

const Getproducts = () => {
    let navigate = useNavigate();
    const [products,setProducts] = useState([])
    const {auth} = useContext(UserContext)
    
    if(!auth){
        toast.success("You're not authorized.",{
            position: toast.POSITION.BOTTOM_RIGHT
        })

        navigate("/", { replace: true });
    } 

    useEffect(()=>{
        const getProducts = async () =>{
        const res = await axios.get(`${url}/products`)
        const data = await res.data
        setProducts(data)
        }
        if(auth) getProducts()
    },[auth])

    const columns = [
        {field: "id",headerName:"ID",width:80},
        {field: "product",headerName:"Product",width:200},
        {field: "price",headerName:"Price",width:100},
        {field: "description",headerName:"Description",width:450},
        {
            field: "action",
            headerName:"Action",
            width:80,
            renderCell:(params)=>{
                return(
                    <>
                    <Link to={{pathname:"/product/"+ params.row.id,product:params.row}} style={{color:"#000",cursor:'pointer'}}>
                        <i className="fas fa-pencil-alt"></i>
                    </Link>
                    <i className="fas fa-trash" style={{color:"#000",marginLeft:"10px"}}></i>
                    </>
                )
            } 
        },
    ];

    return (
        <div className="container">
        <div className="content">
            <Link to="/admin/product">
                <button className="btn-primary btn-">new product</button>
            </Link>

            <div className="row products mtop">
                <div style={{ height: 550, width: '100%' }}>
                    <DataGrid
                        style={{fontFamily:'Poppins'}}
                        rows={products}
                        columns={columns}
                        pageSize={8}
                        disableSelectionOnClick
                        checkboxSelection
                        getRowId={(r)=>r.id}
                    />
                </div>
            </div>
        </div>
    </div>
    )
}
export default Getproducts