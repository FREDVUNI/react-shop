export const url = 'https://shop-rest-apis.herokuapp.com/api/v1'

export const setHeaders = () =>{
    const header = {
        headers:{
            "authorization":'Bearer ' + localStorage.getItem("token")
        }
    }
 
    return header;
}