export function getDataSet(info, headers,keys) {
    var dataset = [{
        columns: [],
        data: []
    }]
   
    for (const column of headers) {
        const data = {
            title: column, width: { wch: 10 },
            style: {
                fill: {
                    patternType: "solid",
                    fgColor: { rgb: "000000" },
                    bgColor: { rgb: "FFFFFF" }
                },
                font:{
                    color:{rgb:"FFFFFF"}
                }
            }
        }

        dataset[0].columns.push(data)
    }

    for(const data of info){
        var temp=[]
        for (const key of keys) {
            const col= {
                value: String(data[key]),
                style: {
                    font: {sz: "10"},
                    alignment:{horizontal:"left"}
                }
            }
            temp.push(col)
        }
    dataset[0].data.push(temp)

    }
    
    return dataset
}

export default {getDataSet}