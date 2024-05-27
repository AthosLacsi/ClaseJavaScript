// Definir un objeto con los productos disponibles y sus precios
const productos = {
    'producto1': 10000,
    'producto2': 15000,
    'producto3': 20000
};

// Función para calcular el costo total de la compra
function calcularCostoTotal(producto, cantidad) {
    let precio = productos[producto];
    let costoTotal = precio * cantidad;

    // Aplicar un descuento del 10% si la cantidad es mayor a 5
    if (cantidad > 5) {
        costoTotal *= 0.9; // Aplicar descuento del 10%
    }

    return costoTotal;
}

// Función para manejar la interacción con el usuario
function simularCompra() {
    let producto = prompt('Ingrese el nombre del producto (producto1, producto2 o producto3):');
    let cantidad = parseInt(prompt('Ingrese la cantidad que desea comprar:'));

    // Verificar si el producto ingresado es válido
    if (productos.hasOwnProperty(producto) && !isNaN(cantidad) && cantidad > 0) {
        let costoTotal = calcularCostoTotal(producto, cantidad);
        alert(`El costo total de la compra es: $${costoTotal.toFixed(2)}`);
    } else {
        alert('Producto inválido o cantidad no válida. Por favor, inténtelo nuevamente.');
    }
}

// Ejecutar la simulación de compra al cargar la página
simularCompra();