
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

$('h1').html('<strong>Tienda "Las Juanas"</strong>')

const btnToogle = $('.palanca-btn').click(function() {
    $('#sidebar').toggleClass('active')
})

const carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];

// VARIABLES 


//let $juanasTienda = document.querySelector('#juanas')
let $contenedorCarrito = document.querySelector('#compras')
let $contenedorTotal = document.querySelector('#total')

let $juanasTienda = $('#juanas')
function renderbaseDeDatos () {
    baseDeDatos.forEach(function(producto){
        var miNodoTienda = $(document.createElement('div'))
        .addClass('col-12').addClass('col-md-4').addClass('sidebar')
        .html(`
        <div class="item shadow mb-4">
            <h3 class="item-titulo text-center pt-3">${producto.nombre}</h3>
            <img class="item-imagen img-fluid p-4" src="${producto.imagen}">
            
            <div class="item-details text-center">
                <h4 class="item-precio">$${producto.precio}</h4>
                <button class="item-boton btn btn-success añadirCarrito" onclick="sumarAlCarrito(${baseDeDatos.indexOf(producto)})">AÑADIR AL CARRITO</button>
                
            </div>
        </div>    `)
        $juanasTienda.append(miNodoTienda)
    });
}
renderbaseDeDatos()
/*function renderbaseDeDatos () {
  baseDeDatos.forEach(function(producto){
      var miNodoTienda = document.createElement('div')
      miNodoTienda.classList.add('col-12','col-md-4','sidebar')
      miNodoTienda.innerHTML = `
                  <div class="item shadow mb-4">
                    <h3 class="item-titulo text-center pt-3">${producto.nombre}</h3>
                    <img class="item-imagen img-fluid p-4" src="${producto.imagen}">
                    
                    <div class="item-details text-center">
                          <h4 class="item-precio">$${producto.precio}</h4>
                          <button class="item-boton btn btn-success añadirCarrito" onclick="sumarAlCarrito(${baseDeDatos.indexOf(producto)})">AÑADIR AL CARRITO</button>
                          
                    </div>
                  </div>       
          `
      $juanasTienda.appendChild(miNodoTienda)
  })
}
renderbaseDeDatos()*/



function sumarAlCarrito(index) {
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
    renderCarrito()
    sumadorDePrecios()
    localStorage.carrito = JSON.stringify(carrito);
}

function renderCarrito(){
    localStorage.carrito = JSON.stringify(carrito)
    $contenedorCarrito.innerHTML = '';
    if(carrito.length > 0) {
        carrito.forEach( element => {
            $contenedorCarrito.innerHTML += `
            
                <div class="col-6">
                    <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <img src=${element.imagen} class="shopping-cart-image">
                        <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${element.nombre}</h6>
                    </div>
                </div>
                <div class="col-2">
                    <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <p class="item-price mb-0 shoppingCartItemPrice">$${element.precio}</p>
                    </div>
                </div>
                <div class="col-2">
                    <div class="shopping-cart-total d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                        <p class="pt-3">${element.cantidad}</p>
                        
                    </div> 
                </div>
                <div class="col-2">
                    <div class="shopping-cart-total d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                        <button class="btn btn-danger buttonDelete" onclick="borradoDeProductos(${carrito.indexOf(element)})">X</button>
                    </div>
                </div>
            `    
        })
    }
}


function borradoDeProductos(index) {
    carrito[index].cantidad = carrito[index].cantidad - 1
    if(carrito[index].cantidad <= 0) {
        carrito.splice(index, 1)
    }
    localStorage.carrito = JSON.stringify(carrito)
    renderCarrito()
    restadorDePrecios()
}
function restadorDePrecios() {
    carrito.forEach(dejarDeComprar =>{
    total = sumadorDePrecios() - dejarDeComprar.precio
    })
    localStorage.carrito = JSON.stringify(carrito)
}
function sumadorDePrecios() {
    let total = 0
    let precioTotal = document.querySelector('#totalFinal')
    carrito.forEach(cannabis => {
        total = total + cannabis.precio * cannabis.cantidad
        return
    })
    localStorage.carrito = JSON.stringify(carrito)
    precioTotal.innerHTML = `total: ${total.toFixed(2)}$`
}

renderbaseDeDatos ()
renderCarrito()



