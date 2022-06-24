export function formatInputDate(datevalue){
    if(datevalue!==null&&datevalue!==undefined&&datevalue!==""){
    var arrayDate=datevalue.split('-')
    if(arrayDate.length===3){
    return arrayDate[1]+"/"+arrayDate[2]+"/"+arrayDate[0]
    }else{
        return ""
    }
}

return ""
}


export default {formatInputDate}