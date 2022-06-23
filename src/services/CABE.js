import axios from "axios";
import server from "../services/Connection/backEndLink"
import {confirmCloseAlert} from "../functions/alerts"


const baseURLAuth=server.url


export const getInformationNoData=async (route)=>{
    const URL=baseURLAuth+route
    var responseBack
    await axios.get(URL).then(
        response=>{
            responseBack=response.data
        }
    ).catch(error=>{
       
        responseBack={status:status.ServerFail,response:[]};
        confirmCloseAlert('incorrect','Error in the Server Response: '+status.ServerFail.Description)
    })

    return responseBack
}


export const getInformationWithData=async (route,data)=>{
    const URL=baseURLAuth+route
    var responseBack
    await axios.post(URL,{data:data}).then(
        response=>{
            responseBack=response.data
        }
    ).catch(error=>{
        confirmCloseAlert('incorrect','Error in the Server Response: '+error)
    })

    return responseBack
}


export const create_Delete_Update_Information=async (route,data)=>{
    const URL=baseURLAuth+route
    var responseBack
    await axios.post(URL,{data:data}).then(
        response=>{
            responseBack=response.data
        }
    ).catch(error=>{
        confirmCloseAlert('incorrect','Error in the Server Response: '+error)
    })

    return responseBack
}

const status = {

    Fail:{code:-1,Description:"Operation fail"},
    Undefined:{code:0,Description:"Operation Undefined"},
    Success:{code:1,Description:"operation successful"},
    ServerFail:{code:504,Description:'Server is not responding please contact the system administrators'}
}


export default {getInformationNoData,create_Delete_Update_Information,getInformationWithData}