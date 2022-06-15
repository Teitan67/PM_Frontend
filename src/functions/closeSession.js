
import { removeCookie } from "../services/cookieService"


export const closeSession=()=>{
    removeCookie('userName')
    removeCookie('name')
    removeCookie('surname')
   
}

export default {closeSession}