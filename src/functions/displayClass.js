

export const displayClass=(estado, className)=>{
   
    let coleccion = document.getElementsByClassName(className);

    for (let objeto of coleccion) {
        console.log("d")
        objeto.style.display = estado;
    }
    
}

export default {displayClass}