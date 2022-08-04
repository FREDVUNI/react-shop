import {createContext,useState} from 'react'
import jwtDecode from 'jwt-decode'

const UserContext = createContext()

export function UserProvider({children}){
    
    let isLoggedIn = localStorage.getItem('token') 
        ? jwtDecode(localStorage.getItem('token')) : ''

    let [auth,setAuth] = useState(isLoggedIn)
    const [clients,getClients] = useState([])

    return(
        <UserContext.Provider value={{isLoggedIn,auth,setAuth,clients,getClients}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext