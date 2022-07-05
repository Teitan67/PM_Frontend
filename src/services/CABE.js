import axios from "axios";
import server from "../services/Connection/backEndLink"
import {confirmCloseAlert} from "../functions/alerts"
import { status } from "../components/Status";
import { getValueCookie } from "./cookieService";
const baseURLAuth=server.url


export const getInformationNoData=async (route)=>{
    const URL=baseURLAuth+route
    var responseBack={
        data:[],
        status:status.Fail
    }
    await axios.get(URL).then(
        response=>{
            responseBack=response.data
        }
    ).catch(error=>{
       
        responseBack={status:status.ServerFail,response:[]};
        confirmCloseAlert('incorrect','Error in the Server Response: '+error)
       // confirmCloseAlert('incorrect','Error in the Server Response: '+status.ServerFail.Description)
    })

    return responseBack
}


export const getInformationWithData=async (route,data)=>{
    const URL=baseURLAuth+route
    var responseBack={
        data:[],
        status:status.Fail
    }
    if(getValueCookie('userName')){
    await axios.post(URL,{data:data}).then(
        response=>{
            responseBack=response.data
        }
    ).catch(error=>{
        confirmCloseAlert('incorrect','Error in the Server Response: '+error)
    })
}else{
    window.location.reload()
}

    return responseBack
}


export const create_Delete_Update_Information=async (route,data)=>{
    const URL=baseURLAuth+route
    var responseBack={
        data:[],
        status:status.Fail
    }
    if(getValueCookie('userName')){
    await axios.post(URL,{data:data}).then(
        response=>{
            responseBack=response.data
        }
    ).catch(error=>{
        confirmCloseAlert('incorrect','Error in the Server Response: '+error)
    })
}else{
    window.location.reload()
}


    return responseBack
}




export default {getInformationNoData,create_Delete_Update_Information,getInformationWithData}