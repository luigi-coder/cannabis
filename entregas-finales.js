
// BASE DE DATOS PARA LA TIENDA 
 let baseDeDatos = [
  {
      nombre: 'LIMON PURPURA',
      precio: 10.45,
      imagen: 'multimedia/purple-lemonade.png'
  },
  {
      nombre: 'GALLETAS DE GORILA',
      precio: 11.75,
      imagen: 'multimedia/gorila-cookie-auto.jpg'
  },
  {
      nombre: 'PASTEL DE LIMON',
      precio: 12.85,
      imagen: 'multimedia/lemon-pie-auto.jpg'
  },
  {
      nombre: 'STRAWBERRY PIE',
      precio: 13.55,
      imagen: 'multimedia/strawberry-pie-auto.jpg'
  },
  {
      nombre: 'DINAMED KUSH CBD',
      precio: 14.65,
      imagen: 'multimedia/dinamed-kush-auto-cbd.jpg'
  },
  {
      nombre: 'WEDDING CHEESCAKE',
      precio: 15.65,
      imagen: 'multimedia/wedding-cheescake-auto.jpg'
  },
  {
      nombre: 'ORANGE SHERBET',
      precio: 16.65,
      imagen: 'multimedia/orange-sherbet-auto.jpg'
  },
  {
      nombre: 'FAST GREEN CRACK',
      precio: 17.65,
      imagen: 'multimedia/fast-green-crack.jpg'
  },
  {
      nombre: 'CHAMPAGEN',
      precio: 18.65,
      imagen: 'multimedia/mimosa-champagne.jpg'
  },
  {
      nombre: 'SOMANGO GLUE',
      precio: 19.65,
      imagen: 'multimedia/somango-glue.jpg'
  },
  {
      nombre: 'LOST COAST OG',
      precio: 20.65,
      imagen: 'multimedia/lost-coast-og.jpg'
  },
  {
      nombre: 'AUTO ZKITTLEZ',
      precio: 21.65,
      imagen: 'multimedia/auto-zkittlez.jpg'
  }

] 
const carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];

// VARIABLES 
let $juanas = document.querySelector('#juanas')

let $compraDeProductos = document.querySelector('#compras')
let $sectorModal = document.querySelector('#modal')




function renderbaseDeDatos () {
  baseDeDatos.forEach(function(producto){
      var miNodoTienda = document.createElement('div')
      miNodoTienda.classList.add('col-12','col-md-4')
      miNodoTienda.innerHTML = `
              
                  <div class="item shadow mb-4">
                      <h3 class="item-titulo text-center pt-3">${producto.nombre}</h3>
                      <img class="item-imagen img-fluid p-4" src="${producto.imagen}">
                    
                      <div class="item-details text-center">
                          <h4 class="item-precio">$${producto.precio}</h4>
                          <button class="item-boton btn btn-success añadirCarrito" onclick="agregarAlCarrito(${baseDeDatos.indexOf(producto)})">AÑADIR AL CARRITO</button>
                          
                      </div>
                  </div>       
          `
      $juanas.appendChild(miNodoTienda)
  })
}
renderbaseDeDatos()

function sectorCompraDeCepas () {
  let miNodoCompra1 = document.createElement('div')
  miNodoCompra1.classList.add('col-6')
  miNodoCompra1.innerHTML = `
            <div class="shopping-cart-header">
                <h6>Producto</h6>
            </div>
  `
  let miNodoCompra2 = document.createElement('div')
  miNodoCompra2.classList.add('col-2')
  miNodoCompra2.innerHTML = `
          <div class="shopping-cart-header">
              <h6 class="text-truncate">Precio</h6>
          </div>
  `
  let miNodoCompra3 = document.createElement('div')
  miNodoCompra3.classList.add('col-4')
  miNodoCompra3.innerHTML = `
          <div class="shopping-cart-header">      
              <h6>Cantidad</h6>
          </div>
  `
  let miNodoCompra4 = document.createElement('div')
  miNodoCompra4.classList.add('col-md-12')
  miNodoCompra4.innerHTML = `
          <div class="shopping-cart-total d-flex align-items-center">
                <p class="mb-0">Total</p>
                <p class="ml-4 mb-0 modificacionTotal">0$</p>
                
                <button class="ml-auto btn btn-success botonDeCompra" type="button" data-toggle="modal"
                    data-target="#comprarModal">Comprar</button>
          </div>
  `
  $compraDeProductos.appendChild(miNodoCompra1)
  $compraDeProductos.appendChild(miNodoCompra2)
  $compraDeProductos.appendChild(miNodoCompra3)
  $compraDeProductos.appendChild(miNodoCompra4)
}
sectorCompraDeCepas()

function sectorModal () {
  let miNodoModal = document.createElement('div')
  miNodoModal.classList.add('row')
  miNodoModal.innerHTML = `
  <div class="modal fade" id="comprarModal" tabindex="-1" aria-labelledby="comprarModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="comprarModalLabel">Gracias por su compra</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Pronto recibirá su pedido</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
  </div>
  `
  $compraDeProductos.appendChild(miNodoModal)

}
sectorModal()

function agregarAlCarrito(index) {
    
    var producto = baseDeDatos[index];
    if (carrito.length > 0) {
        var noExiste = true;
        for (var i = 0; i < carrito.length; i++) {
            if (producto.nombre === carrito[i].nombre) {
            carrito[i].cantidad++;
            noExiste = false;
            }
        }
        if (noExiste) {
            producto.cantidad = 1;
            carrito.push(producto);
        }
    } 
    else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    
    localStorage.carrito = JSON.stringify(carrito);
}


const botonAñadirCarritoCompra = document.querySelectorAll('.añadirCarrito'); 

botonAñadirCarritoCompra.forEach(function (botonAñadirCarrito)  {
    
     botonAñadirCarrito.addEventListener('click', clickAñadirAlCarrito);  
     //botonAñadirCarrito.style.backgroundColor = 'red';
});
  const botonDeCompra = document.querySelector('.botonDeCompra');
  botonDeCompra.addEventListener('click', clickBotonCompra)

  const contenedorArticulosCompra = document.querySelector('.contenidoDeLaCompra') 
// esta variable la colocamos afuera porque la vamos a usar mas veces y la necesitamos como global

function clickAñadirAlCarrito (event) {
    let button = event.target;
    let item = button.closest('.item');
  
    
    const itemTitulo = item.querySelector('.item-titulo').textContent;
    const itemPrecio = item.querySelector('.item-precio').textContent;
    const itemImagen = item.querySelector('.item-imagen').src;

    addItemToShoppingCart(itemTitulo, itemPrecio, itemImagen)
}


function addItemToShoppingCart(itemTitulo, itemPrecio, itemImagen) {

    const titulosDelProducto = contenedorArticulosCompra.getElementsByClassName('tituloProductoCarrito')
    for (let i=0; i<titulosDelProducto.length; i++ ){
        if(titulosDelProducto[i].innerText === itemTitulo) {
            let productoCantidad = titulosDelProducto[i].parentElement.parentElement.parentElement.querySelector('.cantidadProductoCarrito')
            productoCantidad.value++;
            actualizacionTotal()
            return;  
        }
    
    }
    const filaCarritoCompra = document.createElement('div')
    const filaCarritoCompra1 = `
    <div class="row productoCarritoTienda">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImagen} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title tituloProductoCarrito text-truncate ml-3 mb-0">${itemTitulo}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 precioProductoCarrito">${itemPrecio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input cantidadProductoCarrito" type="number"
                    value="1">
                <button class="btn btn-danger botonBorrado type="button">X</button> 
            </div>
        </div>
    </div>`
    filaCarritoCompra.innerHTML = filaCarritoCompra1
    contenedorArticulosCompra.append(filaCarritoCompra);

    filaCarritoCompra.querySelector('.botonBorrado').addEventListener('click', removerProductoCarrito);
    filaCarritoCompra.querySelector('.cantidadProductoCarrito').addEventListener('change', CambioDeCantidad)

    actualizacionTotal()
}

function actualizacionTotal() {
    let total = 0;
    const tiendaCarritoTotal = document.querySelector('.modificacionTotal')
    
    const productosTiendaCarrito = document.querySelectorAll('.productoCarritoTienda')
    productosTiendaCarrito.forEach((productoTiendaCarrito) => {
        const precioProductoCarrito = productoTiendaCarrito.querySelector('.precioProductoCarrito')
        
        const precioProductoCarritoTienda = Number(precioProductoCarrito.textContent.replace('$', ''))
        
        const cantidadProductoCarrito = productoTiendaCarrito.querySelector('.cantidadProductoCarrito')

        const cantidadProductoCarritoTienda = Number(cantidadProductoCarrito.value)
        
        total = total + precioProductoCarritoTienda * cantidadProductoCarritoTienda
        
    })
    tiendaCarritoTotal.innerHTML = `${total.toFixed(2)}$`
}

function removerProductoCarrito(event) {
    const botonBorrado = event.target;
    botonBorrado.closest('.productoCarritoTienda').remove();
    
    actualizacionTotal()
}
function CambioDeCantidad(event) {
    const botonCantidad = event.target
    if (botonCantidad.value <= 0) {
        botonCantidad.value = 1;
    }
    actualizacionTotal()
}
function clickBotonCompra() {
    contenedorArticulosCompra.innerHTML = '';
    actualizacionTotal ();
} 
