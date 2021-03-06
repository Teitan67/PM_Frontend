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

export function formatInputDateQuery(datevalue){
    if(datevalue!==null&&datevalue!==undefined&&datevalue!==""){
    var arrayDate=datevalue.split('T')
    if(arrayDate.length===2){
    const date2=arrayDate[0].split('-')
    if(date2.length===3){
        return date2[1]+"/"+date2[2]+"/"+date2[0]
    }else{
        return ""
    }

    }else{
        return ""
    }
}

return ""
}

export function formatInputDateQuerytoInput(datevalue){
    if(datevalue!==null&&datevalue!==undefined&&datevalue!==""){
    var arrayDate=datevalue.split('T')
    if(arrayDate.length===2){
    const date2=arrayDate[0].split('-')
    if(date2.length===3){
        return date2[0]+"-"+date2[1]+"-"+date2[2]
    }else{
        return ""
    }

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


export function CompareDates(datesta,dateend){
    
            const date1=datesta.split('/')
            const date2=dateend.split('/')
            if(date1.length===3&&date2.length===3){
            const date3=new Date(date1[2]+"-"+date1[0]+"-"+date1[1])
            const date4=new Date(date2[2]+"-"+date2[0]+"-"+date2[1])
           
            if(date3<=date4){
                return true
            }

            return false
        }
  

    }

export function DateFormatMAS90(date){
    var arr=date.split('-')
    if(arr.length===3){
        return arr[1]+"/"+arr[2]+"/"+arr[0]
    }else{
        return ""
    }
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

export function FormatQueryReturnDateWithDash(date){
    var div=String(date).split('T')
    if(div.length===2){
        return div[0].split('-')
    }else{
        return ""
    }
}

export function getDateFromReports(){
    const datenow=new Date()
    return (datenow.getMonth()+1)+"-"+datenow.getDate()+"-"+datenow.getFullYear()
}

export function getDateYearMonthDayDash(){
    const datenow=new Date()
    return datenow.getFullYear()+'-'+(datenow.getMonth()+1)+"-"+datenow.getDate()
}

export function ActualDate(){
    const datenow=new Date()
    return (datenow.getMonth()+1)+"/"+datenow.getDate()+"/"+datenow.getFullYear()
}
export function getActualDateUTC(){
    const datenow=new Date()
    return datenow.toISOString()
}


export default {formatInputDate,OrderArrayByDate,FormatQueryReturnDate,ActualDate,getActualDateUTC,formatInputDateQuery,FormatQueryReturnDateWithDash,
    getDateYearMonthDayDash,CompareDates,formatInputDateQuerytoInput,DateFormatMAS90}