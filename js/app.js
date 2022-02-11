//Listado de usuarios para AJAX
const URL = "http://hp-api.herokuapp.com/api/characters"

//Constante items
const items = document.getElementById("container-items")
const templateCard= document.getElementById("template-card").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const itemsEnCarrito = document.getElementById("itemsEnCarrito")
const footerCarrito = document.getElementById("footer-carrito")
const fragment = document.createDocumentFragment()


//Creamos el objeto carrito
let carrito = {};

//Esperar a que se cargue el DOM
document.addEventListener('DOMContentLoaded',() => {
    fetchData();
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        identificarCarrito();
    }
})


//FETCH para poder acceder a los datos de JSON
const fetchData = async () => {
    try{
        const res = await fetch('json/data.json');
        const data = await res.json();
        identificarCard(data);
    }catch(error){
        console.log(error);
    }
}

//Pintar card en HTML dinámicamente con Javascript
const identificarCard = data => {
    //console.log(data)
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.nombre;
        templateCard.querySelector('p').textContent = producto.precio+" USD";
        templateCard.querySelector('img').setAttribute("src",producto.imagen)
        templateCard.querySelector('button').dataset.id = producto.id


        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}
//Teniendo en cuenta el contenedor de los productos, se añade event listener para los botones
items.addEventListener("click", e => {
    addCarrito(e)
})

const addCarrito = e =>{
    //Detecto si el click se produce sobre el elemento que posee la clase boton-carrito
    if(e.target.classList.contains("boton-carrito")){
        setCarrito(e.target.parentElement)
    }
    
    //Alert producto añadido al carrito
    switch(e.target.dataset.id){
        case "1": 
        Swal.fire({
            icon: 'success',
            html: `<p class="texto-alert"> Has añadido al carrito: ${"Nike Air Jordan 1-1"} </p>`, 
            width: 'auto',
            background: 'white',
            timer: 1000,
          });break;

          case "2": 
        Swal.fire({
            icon: 'success',
            html: `<p class="texto-alert"> Has añadido al carrito: ${"Nike Dunk Low Multi-Camo"} </p>`, 
            width: 'auto',
            timer: 1000
          });break;

          case "3": 
        Swal.fire({
            icon: 'success',
            html: `<p class="texto-alert"> Has añadido al carrito: ${"Nike Dunk Low SE FREE.99"} </p>`, 
            width: 'auto',
            timer: 1000
          });break;

          case "4": 
        Swal.fire({
            icon: 'success',
            html: `<p class="texto-alert"> Has añadido al carrito: ${"Nike Dunk Low SP City Market"} </p>`, 
            width: 'auto',
            timer: 1000
          });break;

          case "5": 
        Swal.fire({
            icon: 'success',
            html: `<p class="texto-alert"> Has añadido al carrito: ${"Nike SB Zoom Dunk HP QS Kevin Bradley"} </p>`, 
            width: 'auto',
            timer: 1000
          });break;

          case "6": 
        Swal.fire({
            icon: 'success',
            html: `<p class="texto-alert"> Has añadido al carrito: ${"Nike Air Force 1 Low 'Just Do It"} </p>`, 
            width: 'auto',
            timer: 1000
          });break;

          case "7": 
        Swal.fire({
            icon: 'success',
            html: `<p class="texto-alert"> Has añadido al carrito: ${"Vans Old Skool LOGO"} </p>`, 
            width: 'auto',
            timer: 1000
          });break;

          case "8": 
        Swal.fire({
            icon: 'success',
            html: `<p class="texto-alert"> Has añadido al carrito: ${"Vans Rowan"} </p>`, 
            width: 'auto',
            timer: 1000
          });break;

          case "9": 
        Swal.fire({
            icon: 'success',
            html: `<p class="texto-alert"> Has añadido al carrito: ${"Vans SK8-Hi MTE-2"} </p>`, 
            width: 'auto',
            timer: 1000
          });break;
    }


    //Detiene cualquier otro evento que se pueda generar sobre items por herencia del contenedor padre
    e.stopPropagation();
}

//Setear el carrito
var regex = /(\d+)/g;
const setCarrito = objeto =>{
    const producto = {
    //Al ser un objeto, le otorgo al id el valor del id que posee el boton que presiono
    id: objeto.querySelector("button").dataset.id,
    nombre: objeto.querySelector("h5").textContent,
    precio: objeto.querySelector("p").textContent.match(regex),
    cantidad: 1
    }
    //Si el carrito tiene a ese producto, entonces sumo cantidad pero no repito el producto
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    //Carrito en esa posicion sera igual a una copia del producto
    carrito[producto.id] = {...producto}
    identificarCarrito()
    //console.log(producto)
}

const identificarCarrito = () => {
    //Para identificar el valor de un objeto, debo utilizar Object.values
    itemsEnCarrito.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector("th").textContent = producto.id;
        //Los td son un array, por lo que puedo ir accediendo posicion por posicion
        templateCarrito.querySelectorAll("td")[0].textContent = producto.nombre
        templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad
        templateCarrito.querySelector(".btn-success").dataset.id=producto.id;
        templateCarrito.querySelector(".btn-danger").dataset.id=producto.id;
        templateCarrito.querySelector("span").textContent=producto.cantidad*producto.precio;
        
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone);
    })
        itemsEnCarrito.appendChild(fragment)
        pintarFooterCarrito();

        localStorage.setItem("carrito",JSON.stringify(carrito))
}

const pintarFooterCarrito = () =>{
    footerCarrito.innerHTML= ''
    //Leemos si el footer esta vacío, y en caso de que sí, mostrar mensaje carrito vacío
    if(Object.keys(carrito).length === 0){
        footerCarrito.innerHTML = `<th scope="row" colspan="5">Carrito vacío</th>`
        return
    }

    //Acumulador de cantidades
    const nCantidad = Object.values(carrito).reduce((acu,{cantidad}) => acu+cantidad, 0)
    //Cálculo del precio (nCantidad * precio)
    const totalCompra = Object.values(carrito).reduce((acu,{cantidad,precio}) => acu+cantidad*precio, 0)
    
    //Asigna nCantidad a Cantidad
    templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
    //Asigna totalCompra a Total
    templateFooter.querySelector("span").textContent = totalCompra;
    
    //Total acumulado
    //Capturamos el total acumulado
    let totalAcumulado = document.getElementById("totalAcumulado");
    totalAcumulado.innerHTML = `<span>Total acumulado: ${totalCompra} USD</span>`;
    totalAcumulado.setAttribute("totalAcumulado", totalCompra)

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone)

    footerCarrito.appendChild(fragment)

    //Función para añadir evento a botón vaciar carrito
    const vaciarCarrito = document.getElementById("vaciar-carrito")
    vaciarCarrito.addEventListener("click", () =>{
        //carrito es ahora un objeto vacío
        carrito= {} 
        let totalAcumulado = document.getElementById("totalAcumulado");
        totalAcumulado.innerHTML = `<span>Total acumulado: </span>`;
        //vuelvo a analizar si el carrito esta vacío
        identificarCarrito()
    })
}

//Funciones para añadir funcionalidad a los botones agregar y quitar
itemsEnCarrito.addEventListener("click", e => {
    btnAccion(e);
})

const btnAccion = e => {
    if(e.target.classList.contains("btn-success")){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id] = {...producto}
        identificarCarrito();
    }

    if(e.target.classList.contains("btn-danger")){
        const producto = carrito[e.target.dataset.id];
        if(producto.cantidad === 0){
            //Delete elimina un objeto
           delete carrito[e.target.dataset.id]
        }
        producto.cantidad--;
        identificarCarrito();   
    }
    e.stopPropagation();
}

//GET Usuario
$('#usuario').click( () => {
    $.get(URL, (response, status) => {
      if(status!=="success"){
        throw new Error("Error")
      }
      for(let i=0;i<response.length;i++){
        console.log(response[i].name)
      }
    })
  })

//Confirmar compra
let confirmarCompra=document.getElementById("confirmar-compra");
confirmarCompra.addEventListener("click", () =>{
    open("./html/confirmarCompra.html")
})  





 
 


