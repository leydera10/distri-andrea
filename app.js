

    //  CARRITO 

//Funcion constructora
function Carnes(id, Tipo, Nombre, stock, precio, img) {
    this.id = id;
    this.Tipo = Tipo;
    this.Nombre = Nombre;
    this.stock = stock;
    this.precio = precio;
    this.img = img;
  }
  
  // creamos objetos a partir de la función constructora
  const item1 = new Carnes(1, "RES", "Carne fina", 1, 13500, './img/Carne-Res-.webp');
  const item2 = new Carnes(2, "CERDO", "Panceta", 1, 11000, './img/Carne-Res-.webp');
  const item3 = new Carnes(3, "POLLO", "Pechuga", 1, 7000, './img/Carne-Res-.webp');
  const item4 = new Carnes(4, "RES", "Chatas", 1, 15500, './img/Carne-Res-.webp');
  const item5 = new Carnes(5, "CERDO", "Tocino", 1, 8500, './img/Carne-Res-.webp');
  const item6 = new Carnes(6, "POLLO", "Pechuga desguasada", 1, 9000, './img/Carne-Res-.webp');
  const item7 = new Carnes(7, "RES", "Carne de bola", 1, 13500, './img/Carne-Res-.webp');
  const item8 = new Carnes(8, "CERDO", "lomo de cerdo", 1, 13000, './img/Carne-Res-.webp');
  const item9 = new Carnes(9, "POLLO", "Perniles", 1, 5500, './img/Carne-Res-.webp');
  const item10 = new Carnes(10, "RES", "Cadera", 1, 13500, './img/Carne-Res-.webp');
  const item11 = new Carnes(11, "CERDO", "Costilla ahumada", 1, 10000, './img/Carne-Res-.webp');
  const item12 = new Carnes(12, "POLLO", "Alas", 1, 5500, './img/Carne-Res-.webp');
  
  
  const stockProductos = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12];
  
const contadorCarrito = document.getElementById('contadorCarrito')
const contenedorProductos  = document.getElementById('contendor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const precioTotal = document.getElementById('precioTotal')

let carrito = []



stockProductos.forEach((Carnes) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img class="imgr" src=${Carnes.img} alt="">
    <h3>${Carnes.Nombre}</h3>
    <h3>${Carnes.Tipo}</h3>
    <p class="precioProducto">Precio:$ ${Carnes.precio}</p>
    <button id="agregar${Carnes.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `

    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${Carnes.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(Carnes.id)

    })

})

const agregarAlCarrito = (id) => {
    const existe = carrito.some (prod => prod.id === id)  
    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === id){
                prod.stock++
            }
        })
    } else { 
        
    const item = stockProductos.find((prod) => prod.id === id )
    carrito.push(item)
    console.log(carrito)
}
actualizarCarrito()
       
}

const actualizarCarrito = () => {
    
    contenedorCarrito.innerHTML = "" 
    
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.Nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.stock}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    contadorCarrito.innerText = carrito.length // actualizamos con la longitud del carrito.
    //OCTAVO PASO
    console.log(carrito)
    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.stock * prod.precio, 0)
}

const eliminarDelCarrito = (id) => {
    const item = carrito.find((prod) => prod.id === id)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    actualizarCarrito() 
    console.log(carrito)
}

const botonVaciar = document.getElementById('vaciar-carrito')

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})



