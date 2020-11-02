
//================= AJAX ================//

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
		error: function (error) {
			console.log(error);
		}
	})
}
//================= ANIMACION DE LAS CART ================//
$(document).ready(function () {
    $(window).scroll(function () {
      $(".cart.item").each(function (i) {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if (bottom_of_window > bottom_of_object) {
          $(this).animate({ opacity: "1" }, 500);
        }
      });
    });
  });
//=================== CARRITO ===================//
const carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];

//=================== VARIABLES ===================//
let $juanasTienda = $('#juanas')
let $contenedorCarrito = document.querySelector('#compras')
let $contenedorTotal = document.querySelector('#total')

function renderbaseDeDatos () {
    baseDeDatos.forEach(function(producto){
        var miNodoTienda = $(document.createElement('div'))
        .addClass('col-md-4').addClass()
        .html(`
        
        <div class="cart item shadow mb-4" style="opacity:3">
            <h3 class="item-titulo text-center titulo pt-3">${producto.nombre}</h3>
            <div class="container1">
                <img class="item-imagen img-fluid p-4" src="${producto.imagen}">
                <div class="overlay">
                    <div class="text">
                        <img src=${producto.imagen} class=" shopping-cart-image">
                        <h5>${producto.nombre}</5>
                        <p class="semilla">precio</p>
                        <p>El precio es por 5 Semillas</p>
                        <p>Por la compra de 15 Semillas el envío es gratis.
                    </div>
                </div>
            </div>
            <div class="item-details text-center">
                <h4 class="item-precio">$${producto.precio}</h4>
                <button class="item-boton btn btn-success" onclick="sumarAlCarrito(${baseDeDatos.indexOf(producto)})">COMPRAR</button>
            </div>
        </div> 
           `)
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
    botoncito()
    renderCarrito()
    sumadorDePrecios()
    localStorage.carrito = JSON.stringify(carrito);
}

function renderCarrito(){
    localStorage.carrito = JSON.stringify(carrito)
    $contenedorCarrito.innerHTML = ""
    if(carrito.length > 0) {
        
        carrito.forEach( element => {
            $contenedorCarrito.innerHTML += `
            <div class="row shoppingCartItem">
                <div class="col-6">
                    <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <img src=${element.imagen} class="shopping-cart-image">
                        <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate text-light ml-3 mb-0">${element.nombre}</h6>
                    </div>
                </div>
                <div class="col-2">
                    <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <p class="item-price mb-0 shoppingCartItemPrice">$${element.precio}</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                        <p class="item-price mb-0 shoppingCartItemPrice ml-4">${element.cantidad}</p>
                        <button class="btn btn-danger buttonDelete" onclick="borradoDeProductos(${carrito.indexOf(element)})" type="button">X</button>
                    </div>
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
