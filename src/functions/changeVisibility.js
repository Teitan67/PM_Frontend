
  export function displayPage(state, className){
    let coleccion = document.getElementsByClassName(className);
    for (let objetc of coleccion) {
        objetc.style.display = state;
    }
}

export default {displayPage}