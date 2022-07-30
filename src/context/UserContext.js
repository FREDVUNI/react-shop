import {createContext} from 'react'
import jwtDecode from 'jwt-decode'

const UserContext = createContext()

export function UserProvider({children}){
    
    let isLoggedIn = jwtDecode(localStorage.getItem('token')) 
        ? jwtDecode(localStorage.getItem('token')) : ''
    
    return(
        <UserContext.Provider value={{isLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext