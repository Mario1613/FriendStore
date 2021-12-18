//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando add curse a checkpoint "add the cars"
    listaCursos.addEventListener('click', agregarCurso);
    //delete courses of car
    carrito.addEventListener('click', eliminarCurso);

    vaciarCarrito.addEventListener('click', ()=>{
        articulosCarrito = [];
        limpiarHTML();
    });

}

//Functions
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;    
        leerDatosCurso(cursoSeleccionado);
    }
}

//delete a course the car
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //delete of array of article card for the data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); //iterar sobre el carrito y mostrar el html
        console.log('eliminando elemento');
    }
}

//read the content of html to which we click and give the inform the curse
function leerDatosCurso(curso){
    // console.log(curso);
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;//Retorna el objeto actualizado
            }else{
                return curso;//Retorna los objetos que no son duplicaos
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //add elements the array of car
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    //add element to the array of car
    console.log(articulosCarrito);
    carritoHTML();
}

//show the card of buy in the html
function carritoHTML(){
    //clean the HTML
     limpiarHTML();
    //Recorre el carrto y genera el html
    articulosCarrito.forEach(curso=>{
        const {imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td ><img src="${imagen}" width="100%"></td>
            <td >${titulo}</td>
            <td >${precio}</td>
            <td >${cantidad}</td>
            <td ><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;
        //add the HT;L del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}


//delet the curses of tbody


function limpiarHTML(){

    // //forma lenta
    // contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}











