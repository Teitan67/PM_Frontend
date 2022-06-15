import Cookies from "universal-cookie";


const cookies=new Cookies();


export const setNewCookie=async(identification,value,timeExpiration)=>{
    var tiempo=60*timeExpiration;
    var expires = (new Date(Date.now()+ tiempo*1000));
    cookies.set(identification, value, { path: "*",expires:expires,httpOnly:false});
}

export const getValueCookie=(identification)=>{
   return cookies.get(identification)
}

export const removeCookie=(identification)=>{
    cookies.remove(identification)
}



export default {setNewCookie,getValueCookie,removeCookie}