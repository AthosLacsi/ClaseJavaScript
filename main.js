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
    let numCompras = parseInt(prompt('Ingrese el número de productos diferentes que desea comprar:'));

    // Verificar si la cantidad ingresada es válida
    if (isNaN(numCompras) || numCompras <= 0) {
        alert('Número de compras inválido. Por favor, inténtelo nuevamente.');
        return;
    }

    let totalCosto = 0;

    for (let i = 0; i < numCompras; i++) {
        let producto = prompt(`Ingrese el nombre del producto (producto1, producto2 o producto3) para la compra ${i + 1}:`);
        let cantidad = parseInt(prompt(`Ingrese la cantidad que desea comprar del ${producto}:`));

        // Verificar si el producto ingresado es válido
        if (productos.hasOwnProperty(producto) && !isNaN(cantidad) && cantidad > 0) {
            let costoTotal = calcularCostoTotal(producto, cantidad);
            totalCosto += costoTotal;
            console.log(`El costo total de la compra del ${producto} es: $${costoTotal.toFixed(2)}`);
        } else {
            alert('Producto inválido o cantidad no válida. Por favor, inténtelo nuevamente.');
            i--; // Restar uno para repetir la iteración para este producto
        }
    }

    alert(`El costo total de todas las compras es: $${totalCosto.toFixed(2)}`);
}

// Ejecutar la simulación de compra al cargar la página
simularCompra();