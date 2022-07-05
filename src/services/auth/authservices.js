import axios from "axios";
import server from "../Connection/backEndLink"
import {confirmCloseAlert} from "../../functions/alerts"
import { Navigate} from "react-router-dom";
import React from "react"
import { getValueCookie } from "../cookieService";
const baseURLAuth=server.url+"/auth"


export const selectWithDataService=async (object,route)=>{
    const URL=baseURLAuth+route
    var responseBack
    await axios.post(URL,{data:object}).then(

        response=>{
            responseBack=response.data
        }
    ).catch(error=>{
        confirmCloseAlert('incorrect','Error in the Server Response: '+error)
    })

    return responseBack
}

export const ProtectedRoute=({children})=>{
    const temp=getValueCookie('sessionAuthToken')
    
    if(!temp){
        return <Navigate to="/login" />
    }
        return children
    
}



export default {selectWithDataService,ProtectedRoute}