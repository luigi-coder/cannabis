// BASE DE DATOS PARA LA TIENDA 

 let baseDeDatos;
 /*= [
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

] */
document.addEventListener('DOMContentLoaded', cargaInicial);

function cargaInicial() {
	$.ajax({
		url: 'db.json',
		success: function (data) {
			console.log(data)
			baseDeDatos = data;
			renderbaseDeDatos();
			renderCarrito();
		},
		error: function (error, jqXHR, status) {
			console.log(error);
		}
	})
}

//$('h1').html('<strong>Tienda "Las Juanas"</strong>')

//=================== SIDEBAR ===================//
const btnToogle = $('.palanca-btn').click(function() {
    $('#sidebar').toggleClass('active')
})
//=================== CARRITO ===================//
const carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];

//=================== VARIABLES ===================//
let $juanasTienda = $('#juanas')
let $contenedorCarrito = document.querySelector('#compras')
let $contenedorTotal = document.querySelector('#total')

/*function cargarProductos() {
    $.getJSON("db.json", function (datos) {
      datos.forEach((productoAjax) => {
        $('#juanas').addClass('row').addClass('col-12').addClass('col-md-4').addClass('sidebar').append(`
          <div class="item shadow mb-4">
              <h3 class="item-titulo text-center pt-3">${productoAjax.nombre}</h3>
              <img class="item-imagen img-fluid p-4" src="${productoAjax.imagen}">
              <div class="item-details text-center">
                  <h4 class="item-precio">$${productoAjax.precio}</h4>
                  <button class="item-boton btn btn-success" onclick="sumarAlCarrito(${datos.indexOf(
                    productoAjax)})">AÑADIR AL CARRITO</button>
              </div>
          </div> `);
      });
      $("#juanas").append(JSON.stringify(datos));
    });
  }
cargarProductos()*/

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
                <button class="item-boton btn btn-success" onclick="sumarAlCarrito(${baseDeDatos.indexOf(producto)})">AÑADIR AL CARRITO</button>
                
            </div>
            
        </div>    `)
        $juanasTienda.append(miNodoTienda)
    });
}
renderbaseDeDatos() 

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

                <div class="col-4">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-2 mt-2 mb-0">${element.nombre}</h6>
                    
                    <div class="d-flex align-items-center h-100  pb-2 mt-0">
                        <img src=${element.imagen} class="shopping-cart-image">
                        <!--<h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-2 mb-0">${element.nombre}</h6>-->
                    </div>
                </div>
                <div class="col-5">
                    <div class="shopping-cart-total d-flex align-items-center h-100  pb-2 pt-3">
                        <p class="item-price mb-0 shoppingCartItemPrice">$${element.precio}</p>
                    </div>
                </div>
                <div class="col-1">
                    <div class="shopping-cart-total d-flex justify-content-between align-items-center h-100  pb-2 pt-3">
                        <p class="pt-3">${element.cantidad}</p>
                        
                    </div> 
                </div>
                <div class="col-1">
                    <div class="shopping-cart-total d-flex  align-items-center text-center h-100  pb-2 pt-3">
                        <button class="btn btn-danger buttonDelete" onclick="borradoDeProductos(${carrito.indexOf(element)})">X</button>
                    </div>
                </div>
            `    
        })
    }
    sumadorDePrecios()
}

function sumadorDePrecios() {
    let total = 0
    let precioTotal = document.querySelector('#totalFinal')
    carrito.forEach(cannabis => {
        total = total + cannabis.precio * cannabis.cantidad
        return
    })
    localStorage.carrito = JSON.stringify(carrito)
    precioTotal.innerHTML = `TOTAL: ${total.toFixed(2)}$`
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
renderbaseDeDatos()
renderCarrito()




