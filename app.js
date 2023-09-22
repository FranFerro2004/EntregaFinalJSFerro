class productodelista {
	constructor(Nombre, Precio, Marca, Descuento){
	this.Nombre = Nombre;
	this.Precio = Precio;
	this.Marca = Marca;
	this.Descuento = Descuento;
	}
}

let listaDeProductos = [];


const fetchProductos = async () => {
	try{
		const res = await fetch('../JSON/productos.JSON');
		const data = await res.json(); 

		listaDeProductos = [];

		data.forEach(elemento =>{
			const producto = new productodelista(
				
				elemento.Nombre,
				elemento.Precio,
				elemento.Marca,
				elemento.Descuento,
			);
			listaDeProductos.push(producto);
		});
		mostrarProductosEnHTML();

	} catch (error){
		console.error(error);
	};
};

fetchProductos()

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
	};

}

function guardarCarritoLocalStorage() {
	if (Array.isArray(carrito) && carrito.every(contenido => typeof contenido === 'object')){
		localStorage.setItem('carrito', JSON.stringify(carrito))
	}else{
		alert("Ocurrio un error y el producto no se pude agregar al carrito de manera adcuada")
		console.log("Hubo un error en el formato de los items del array carrito")
	}
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
    const validacion = carrito.includes(productoSeleccionado);
    if (validacion === false) {
        carrito.push(productoSeleccionado);
        guardarCarritoLocalStorage();
        mostrarCarritoEnHTMl();

		Toastify({
			text: 'Producto Agregado!',
			duration: 3000,
			gravity: "bottom",
			position : "right",
		}).showToast();
    } else {
        Swal.fire({
            title: 'Producto Repetido!',
            text: "¿Quieres añadirlo de todas formas?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                confirmarAgregado(productoSeleccionado);
				Toastify({
					text: 'Producto Agregado!',
					duration: 3000,
					gravity: "bottom",
					position : "right",
				}).showToast();
            } 
        });
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

const botonNo = document.getElementById('botonNo')
botonNo.addEventListener('click', () => productoRepetidoHTML.style.display = "none")

function confirmarAgregado(productoSeleccionado){
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
	


