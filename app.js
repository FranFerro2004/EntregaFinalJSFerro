const listaDeProductos = [
	{ Nombre: "Zapatilla", Precio: 10000, Marca: "Nike", Codigo: "2001", Descuento: true },
	{ Nombre: "Pantalon", Precio: 5000, Marca: "Adidas", Codigo: "6071", Descuento: false },
	{ Nombre: "Mochila", Precio: 9000, Marca: "Underarmour", Codigo: "8933", Descuento: false },
	{ Nombre: "Buzo", Precio: 9500, Marca: "Nike", Codigo: "7901", Descuento: true },
	{ Nombre: "Campera", Precio: 12000, Marca: "Adidas", Codigo: "3566", Descuento: false },
	{ Nombre: "Medias", Precio: 1000, Marca: "Nike", Codigo: "2456", Descuento: true },
];

const listaDeProductosHTML = document.getElementById('listaProductosHTML');
const totalCarritoHTML =  document.getElementById('totalCarritoHTML');
const carritoHTML = document.getElementById('carritoHTML');
const productoRepetidoHTML = document.getElementById('productoRepetidoHTML')


let carrito = [];
let productoSeleccionado;

function cargarCarritoAlLocalStorage() {
	const carritoJSON = localStorage.getItem('carrito');
	if (carritoJSON){
		carrito = JSON.parse(carritoJSON);
		mostrarCarritoEnHTMl();
		//alert(carritoJSON)
	};

}

function guardarCarritoLocalStorage() {
		localStorage.setItem('carrito', JSON.stringify(carrito))

}


function mostrarProductosEnHTML() {
	listaDeProductosHTML.innerHTML = '';

	listaDeProductos.forEach(producto => {
		const listarProducto = document.createElement('li');
		listarProducto.innerText = `Producto: ${producto.Nombre} Precio: ${producto.Precio}`;
		
		const crearBoton = document.createElement('button');
		crearBoton.innerText = 'Agregar';
		crearBoton.addEventListener('click', () => {productoSeleccionado = productoElegido(producto);
		agregarAlCarrito(productoSeleccionado)});
		

		listarProducto.appendChild(crearBoton);
		listaDeProductosHTML.appendChild(listarProducto);
	});
}

function productoElegido(producto) {
	return producto;
}

function agregarAlCarrito(productoSeleccionado) {
	const validacion = carrito.includes(productoSeleccionado)
	if (validacion === false){
		carrito.push(productoSeleccionado);
    	
		guardarCarritoLocalStorage();
	
		mostrarCarritoEnHTMl();
	} else{
		productoRepetidoHTML.style.display = "block";
		console.log("Producto Repetido");
	}
}

function mostrarCarritoEnHTMl(){
	carritoHTML.innerHTML = '';
	let valorCarrito = 0;
	carrito.forEach(producto => {
		const listarProducto = document.createElement('li');
		listarProducto.innerText = `Producto: ${producto.Nombre} Precio: ${producto.Precio}`;

		const crearBoton2 = document.createElement('button');
		crearBoton2.innerText = 'Eliminar';
		crearBoton2.addEventListener('click', () =>sacarObjetoDeCarrito(producto));

		listarProducto.appendChild(crearBoton2);
		carritoHTML.appendChild(listarProducto);

		valorCarrito += producto.Precio;
	})
	totalCarritoHTML.innerText = valorCarrito;
}

function sacarObjetoDeCarrito(producto){
	const posicion = carrito.indexOf(producto);
	if (posicion !== -1){
		carrito.splice(posicion, 1);
		mostrarCarritoEnHTMl();
		guardarCarritoLocalStorage();
	}
};

const limpiarCarritoHTML = document.getElementById('botonLimpiarCarritoHTML')
limpiarCarritoHTML.addEventListener('click', () => borrarCarritoHTML())
function borrarCarritoHTML() {
    carrito = []; 
    mostrarCarritoEnHTMl();
	guardarCarritoLocalStorage();
	
}


const botonSi = document.getElementById('botonSi')

botonSi .addEventListener('click' , () => {
	if (productoSeleccionado){
		confirmarAgregado(productoSeleccionado);
		
	}
		
});

function confirmarAgregado(productoSeleccionado){
	//alert(productoSeleccionado)
	carrito.push(productoSeleccionado);
	productoSeleccionado = undefined;
	productoRepetidoHTML.style.display = "none";
	guardarCarritoLocalStorage();
	mostrarCarritoEnHTMl()
	

}


cargarCarritoAlLocalStorage() 
mostrarCarritoEnHTMl()
mostrarProductosEnHTML()
console.log (carrito)
	

