export function getIndexElement(array, key, element){
    const index = array.findIndex(code => {  
        return String(code[key]).toUpperCase() === element.toUpperCase()
    })

    return index
}

export default {getIndexElement}