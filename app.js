

const listaDeProductos = [
    { Nombre: "Zapatilla", Precio: 10000, Marca: "Nike", Codigo: "2001", Descuento: true},
    { Nombre: "Pantalon", Precio: 5000, Marca: "Adidas", Codigo: "6071", Descuento: false},
    { Nombre: "Mochila", Precio: 9000, Marca: "Underarmour", Codigo: "8933", Descuento: false},
    { Nombre: "Buzo", Precio: 9500, Marca: "Nike", Codigo: "7901", Descuento: true},
    { Nombre: "Campera", Precio: 12000, Marca: "Adidas", Codigo: "3566", Descuento: false},
    { Nombre: "Medias", Precio: 1000, Marca: "Nike", Codigo: "2456", Descuento: true},
];

let mensajeUsuario = "Lista de productos: \n\n";

let carrito = [];

let  valorDelCarrito = 0

let nuevoValorDeCarrito = 0

function agrgarObjetoAlCarrito(productoEncontrado){
    carrito.push(productoEncontrado)
    alert (` ${productoEncontrado.Nombre} se agrego al carrito y tiene un precio de ${productoEncontrado.Precio}`)

}


function precioFinalCarrito(){
    for(let producto of carrito){
        valorDelCarrito += producto.Precio;

    }

    return valorDelCarrito

}

function sacarObjetoDeCarrito(productoDeCarritoEncontrado){
    carrito = carrito.filter(producto => producto.Nombre !== productoDeCarritoEncontrado);

    nuevoValorDeCarrito = precioFinalCarrito();

    return nuevoValorDeCarrito;
}

for (let producto of listaDeProductos){
    mensajeUsuario += `Nombre: ${producto.Nombre} `;
    mensajeUsuario += `Marca: ${producto.Marca} `
    mensajeUsuario += `Precio: ${producto.Precio} \n\n`;
    ;
};

alert(mensajeUsuario)

let respuesta1 = prompt("¿Te interesa algun producto? si/no");

while ( respuesta1 === "si"){

    alert("Exelente, te vuelvo a dejar la lista\n\n" + mensajeUsuario)

    let productoAgregado = prompt("Exelente, escribe el nombre del elemento que quieras")

    let productoEncontrado = listaDeProductos.find( producto => producto.Nombre === productoAgregado )

    if (productoEncontrado){

        agrgarObjetoAlCarrito(productoEncontrado)
    

    } else {

        alert("El producto que estas buscando no existe!")
        
    }


    respuesta1 = prompt("Hay algun otro producto que te interese? si/no")

} 

precioFinalCarrito()

let resultado3 = prompt("El total de tu carrito es " + valorDelCarrito +  "\n\n ¿Desea quitar algun objeto?")

if(resultado3 === "si"){
    let productoParaSacar = prompt("¿Cual?")

    let productoDeCarritoEncontrado = carrito.find(producto => producto.Nombre === productoParaSacar)

    if (productoDeCarritoEncontrado){

    sacarObjetoDeCarrito()

    } else {

        alert("El producto que estas buscando no existe!")
        
    }

    alert("El producto fue elmiminado y el nuevo precio es:\n\n" + nuevoValorDeCarrito)
    
} 