
/* const listaDeProductos = [
	{ Nombre: "Zapatilla", Precio: 10000, Marca: "Nike", Codigo: "2001", Descuento: true },
	{ Nombre: "Pantalon", Precio: 5000, Marca: "Adidas", Codigo: "6071", Descuento: false },
	{ Nombre: "Mochila", Precio: 9000, Marca: "Underarmour", Codigo: "8933", Descuento: false },
	{ Nombre: "Buzo", Precio: 9500, Marca: "Nike", Codigo: "7901", Descuento: true },
	{ Nombre: "Campera", Precio: 12000, Marca: "Adidas", Codigo: "3566", Descuento: false },
	{ Nombre: "Medias", Precio: 1000, Marca: "Nike", Codigo: "2456", Descuento: true },
];

let mensajeUsuario = "Lista de productos: \n\n";

let carrito = [];

let valorDelCarrito = 0;

let nuevoValorDeCarrito = 0;

function agrgarObjetoAlCarrito(productoEncontrado) {
	carrito.push(productoEncontrado);
	alert(` ${productoEncontrado.Nombre} se agrego al carrito y tiene un precio de ${productoEncontrado.Precio}`);
}

function precioFinalCarrito() {
	valorDelCarrito = 0;
	for (let producto of carrito) {
		valorDelCarrito += producto.Precio;
	}

	return valorDelCarrito;
}

function sacarObjetoDeCarrito(productoDeCarritoEncontrado) {
	carrito = carrito.filter((producto) => producto.Nombre !== productoDeCarritoEncontrado.Nombre);
	console.log(carrito);
	nuevoValorDeCarrito = precioFinalCarrito();

	return nuevoValorDeCarrito;
}

for (let producto of listaDeProductos) {
	mensajeUsuario += `Nombre: ${producto.Nombre} `;
	mensajeUsuario += `Marca: ${producto.Marca} `;
	mensajeUsuario += `Precio: ${producto.Precio} \n\n`;
}

alert(mensajeUsuario);

let respuesta1 = prompt("¿Te interesa algun producto? si/no");

while (respuesta1 === "si") {
	alert("Exelente, te vuelvo a dejar la lista\n\n" + mensajeUsuario);

	let productoAgregado = prompt("Exelente, escribe el nombre del elemento que quieras");

	let productoEncontrado = listaDeProductos.find((producto) => producto.Nombre === productoAgregado);

	if (productoEncontrado) {
		agrgarObjetoAlCarrito(productoEncontrado);
	} else {
		alert("El producto que estas buscando no existe!");
	}

	respuesta1 = prompt("Hay algun otro producto que te interese? si/no");
}

precioFinalCarrito();

let resultado3 = prompt("El total de tu carrito es " + valorDelCarrito + "\n\n ¿Desea quitar algun objeto?");

if (resultado3 === "si") {
	let productoParaSacar = prompt("¿Cual?");

	let productoDeCarritoEncontrado = carrito.find((producto) => producto.Nombre === productoParaSacar);

	if (productoDeCarritoEncontrado) {
		nuevoValorDeCarrito = sacarObjetoDeCarrito(productoDeCarritoEncontrado);
	} else {
		alert("El producto que estas buscando no existe!");
	}

	alert("El producto fue elmiminado y el nuevo precio es:\n\n" + nuevoValorDeCarrito);
} */


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


let carrito = [];




function mostrarProductosEnHTML() {
	listaDeProductosHTML.innerHTML = '';

	listaDeProductos.forEach(producto => {
		const listarProducto = document.createElement('li');
		listarProducto.innerText = `Producto: ${producto.Nombre} Precio: ${producto.Precio}`;
		
		const crearBoton = document.createElement('button');
		crearBoton.innerText = 'Agregar';
		crearBoton.addEventListener('click', () =>agregarAlCarrito(producto));

		listarProducto.appendChild(crearBoton);
		listaDeProductosHTML.appendChild(listarProducto);
	});
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    mostrarCarritoEnHTMl();
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
		mostrarCarritoEnHTMl()
		
	}
};

const limpiarCarritoHTML = document.getElementById('botonLimpiarCarritoHTML')
limpiarCarritoHTML.addEventListener('click', () => borrarCarritoHTML())
function borrarCarritoHTML() {
    carrito = []; 
    mostrarCarritoEnHTMl();
}


mostrarProductosEnHTML()
mostrarCarritoEnHTMl() 

