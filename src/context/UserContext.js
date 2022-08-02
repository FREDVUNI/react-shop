import {createContext,useState} from 'react'
import jwtDecode from 'jwt-decode'

const UserContext = createContext()

export function UserProvider({children}){
    
    let isLoggedIn = localStorage.getItem('token') 
        ? jwtDecode(localStorage.getItem('token')) : ''

    let [auth,setAuth] = useState(isLoggedIn)
    
    return(
        <UserContext.Provider value={{isLoggedIn,auth,setAuth}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext