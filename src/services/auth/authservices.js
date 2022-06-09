import axios from "axios";
import server from "../Connection/backEndLink"
import {confirmCloseAlert} from "../../functions/alerts"
const baseURLAuth=server.url+"/auth"


export const selectWithDataService=async (object,route)=>{
    const URL=baseURLAuth+route
    await axios.post(URL,{data:object}).then(
        response=>{
            return response.data
        }
    ).catch(error=>{
        confirmCloseAlert('incorrect','Error in the Server Response: '+error)
    })
}
//call selectUser('teitan67','123Animales');


export default {selectWithDataService}