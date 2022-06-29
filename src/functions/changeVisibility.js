
export function closeAllPages() {
  let coleccion = document.getElementsByClassName('page');
  for (let objetc of coleccion) {
    objetc.style.display = 'none';
  }
}

export function openPage(id) {
  let page = document.getElementById(id);
  if (page) {
    page.style.display = '';
  }
}

export default { closeAllPages, openPage }