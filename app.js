
let carrito = [];

const contadorCarrito = document.getElementById('contadorCarrito');
const contenedorProductos = document.getElementById('contendor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const precioTotal = document.getElementById('precioTotal');

const productos = './JSON/productos.json';

fetch(productos)
  .then(respuesta => respuesta.json())
  .then(datos => {
    datos.forEach((producto) => {
      const div = document.createElement('div');
      div.classList.add('producto');
      div.innerHTML = `
        <img class="imgr" src=${producto.img} alt="">
        <h3>${producto.Nombre}</h3>
        <h3>${producto.Tipo}</h3>
        <p class="precioProducto">Precio:$ ${producto.precio}</p>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
      `;

      contenedorProductos.appendChild(div);

      const boton = document.getElementById(`agregar${producto.id}`);

      boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id);
      });
    });
  });

const agregarAlCarrito = (id) => {

  Toastify({
    text: "Prodcto Agregado",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #801515, #ffffff)",
      borderRadius: "2rem",
    },
    onClick: function(){} // Callback after click
  }).showToast();


  const existe = carrito.some(prod => prod.id === id);
  if (existe) {
    carrito.forEach(prod => {
      if (prod.id === id) {
        prod.stock++;
      }
    });
  } else {
    const productos = './JSON/productos.json';
    fetch(productos)
      .then(respuesta => respuesta.json())
      .then(datos => {
        const item = datos.find(prod => prod.id === id);
        item.stock = 1; 
        carrito.push(item);
        console.log(carrito);
      });
  }
  actualizarCarrito()
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = '';


  carrito.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'productoEnCarrito';
    div.innerHTML = `
      <p>${prod.Nombre}</p>
      <p>Precio:$${prod.precio}</p>
      <p>Cantidad: <span>${prod.stock}</span></p>
      <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    `;

    contenedorCarrito.appendChild(div);
    localStorage.setItem('carrito', JSON.stringify(carrito))
  });

  contadorCarrito.innerText = carrito.length;
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
};

const eliminarDelCarrito = (id) => {

  Toastify({
    text: "Producto Eliminado",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #801515, #ffffff)",
      borderRadius: "2rem",
    },
    onClick: function(){} // Callback after click
  }).showToast();

  const item = carrito.find(prod => prod.id === id);
  const indice = carrito.indexOf(item);

  carrito.splice(indice, 1);
  actualizarCarrito();
};

const botonVaciar = document.getElementById('vaciar-carrito');

botonVaciar.addEventListener('click', () => {

  Swal.fire({
    title: 'Estas Seguro?',
    text: "Eliminaras todo de tu Carrito!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar Todo!'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito.length = 0;
      actualizarCarrito();
      Swal.fire(
        
      )
    }
  })


});

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
  }
});