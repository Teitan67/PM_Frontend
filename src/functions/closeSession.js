
import { removeCookie } from "../services/cookieService"
import { OpenLogin } from "./pagesFunction"

export const closeSession=async ()=>{
    await removeCookie('userName')
    await  removeCookie('name')
    await removeCookie('surname')
    await removeCookie('sessionAuthToken')
    await removeCookie('Company')
    window.location.reload()
    await OpenLogin()
}

export default {closeSession}