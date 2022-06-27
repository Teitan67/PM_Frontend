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

export function OrderArrayByDate(array){
    for(let a=0;a<array.length;a++){
        for(let b=0;b<(array.length-a-1);b++){
            const date1=array[b].Date.split('/')
            const date2=array[b+1].Date.split('/')
            if(date1.length===3&&date2.length===3){
            const date3=new Date(date1[2]+"-"+date1[0]+"-"+date1[1])
            const date4=new Date(date2[2]+"-"+date2[0]+"-"+date2[1])
            
            if(date3>date4){
                var temp=Object.assign({},array[b])
                array[b]=Object.assign({},array[b+1])
                array[b+1]=Object.assign({},temp)
            }
        }
        }
    }

    return array
}

export function FormatQueryReturnDate(date){
    var div=String(date).split('T')
    if(div.length===2){
        var div2=div[0].split('-')
        if(div2.length===3){
            return div2[1]+"/"+div2[2]+"/"+div2[0]
        }else{
            return ""
        }


    }else{
        return ""
    }
}


export default {formatInputDate,OrderArrayByDate,FormatQueryReturnDate}