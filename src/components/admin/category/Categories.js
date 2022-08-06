import React,{useState,useEffect,useContext} from 'react'
import UserContext from '../../../context/UserContext'
import { useNavigate,Link } from "react-router-dom";
import {toast} from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid';
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

    const columns = [
        {field: "id",headerName:"ID",width:80},
        {field: "category",headerName:"Category",width:700},
        {
            field: "action",
            headerName:"Action",
            width:80,
            renderCell:(params)=>{
                return(
                    <>
                    <Link to={{pathname:"/category/"+ params.row.id,category:params.row}} style={{color:"#000",cursor:'pointer'}}>
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
            <Link to="/admin/category">
                <button className="btn-primary btn-">new category</button>
            </Link>

            <div className="row products mtop">
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        style={{fontFamily:'Poppins'}}
                        rows={categories}
                        columns={columns}
                        pageSize={5}
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
export default GetCategories