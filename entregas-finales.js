// BASE DE DATOS PARA LA TIENDA 
let baseDeDatos = [
  {
      nombre: 'LIMON PURPURA',
      precio: 10.45,
      imagen: 'multimedia/purple-lemonade.png'
  },
  {
      nombre: 'GALLETAS DE GORILA',
      precio: 12.75,
      imagen: 'multimedia/gorila-cookie-auto.jpg'
  },
  {
      nombre: 'PASTEL DE LIMON',
      precio: 13.85,
      imagen: 'multimedia/lemon-pie-auto.jpg'
  },
  {
      nombre: 'STRAWBERRY PIE',
      precio: 16.55,
      imagen: 'multimedia/strawberry-pie-auto.jpg'
  },
  {
      nombre: 'DINAMED KUSH CBD',
      precio: 15.65,
      imagen: 'multimedia/dinamed-kush-auto-cbd.jpg'
  },
  {
      nombre: 'WEDDING CHEESCAKE',
      precio: 13.65,
      imagen: 'multimedia/wedding-cheescake-auto.jpg'
  },
  {
      nombre: 'ORANGE SHERBET',
      precio: 11.65,
      imagen: 'multimedia/orange-sherbet-auto.jpg'
  },
  {
      nombre: 'FAST GREEN CRACK',
      precio: 11.65,
      imagen: 'multimedia/fast-green-crack.jpg'
  },
  {
      nombre: 'CHAMPAGEN',
      precio: 13.65,
      imagen: 'multimedia/mimosa-champagne.jpg'
  },
  {
      nombre: 'SOMANGO GLUE',
      precio: 10.65,
      imagen: 'multimedia/somango-glue.jpg'
  },
  {
      nombre: 'LOST COAST OG',
      precio: 13.65,
      imagen: 'multimedia/somango-glue.jpg'
  },
  {
      nombre: 'AUTO ZKITTLEZ',
      precio: 13.65,
      imagen: 'multimedia/auto-zkittlez.jpg'
  }

]
// VARIABLES 
let $juanas = document.querySelector('#juanas')
let $compraDeProductos = document.querySelector('#compras')
let $sectorModal = document.querySelector('#compras')
let carrito = []


function renderbaseDeDatos () {
  baseDeDatos.forEach(function(producto){
      var miNodoTienda = document.createElement('div')
      miNodoTienda.classList.add('col-12','col-md-4')
      miNodoTienda.innerHTML = `
              
                  <div class="item shadow mb-4">
                      <h3 class="item-title text-center pt-3">${producto.nombre}</h3>
                      <img class="item-image img-fluid p-4" src="${producto.imagen}">
                    
                      <div class="item-details text-center">
                          <h4 class="item-price">$${producto.precio}</h4>
                          <button class="item-button btn btn-success añadirCarrito">AÑADIR AL CARRITO</button>
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
                <p class="ml-4 mb-0 shoppingCartTotal">0$</p>
                
                <button class="ml-auto btn btn-success comprarButton" type="button" data-toggle="modal"
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
// DESDE AQUI SE ACTIVA LA COMPRA 

const addToShoppingCartButtons = document.querySelectorAll('.añadirCarrito');

addToShoppingCartButtons.forEach(addToCartButton => {
     addToCartButton.addEventListener('click', clickAñadirAlCarrito); 
  });

function clickAñadirAlCarrito (event) {
  let button = event.target;
  let item = button.closest('.item');
  

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  alert(itemTitle)
  alert(itemPrice)
  alert(itemImage)
}
