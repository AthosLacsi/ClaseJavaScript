// Definir un objeto con los productos disponibles y sus precios
const productos = {
    'producto1': 10000,
    'producto2': 15000,
    'producto3': 20000
};

// Función para calcular el costo total de la compra
function calcularCostoTotal(producto, cantidad) {
    const precio = productos[producto];
    let costoTotal = precio * cantidad;

    // Aplicar un descuento del 10% si la cantidad es mayor a 5
    if (cantidad > 5) {
        costoTotal *= 0.9; // Aplicar descuento del 10%
    }

    return costoTotal;
}

// Función para manejar la interacción con el usuario
function simularCompra() {
    const numCompras = parseInt(prompt('Ingrese el número de productos diferentes que desea comprar:'));

    // Verificar si la cantidad ingresada es válida
    if (isNaN(numCompras) || numCompras <= 0) {
        alert('Número de compras inválido. Por favor, inténtelo nuevamente.');
        return;
    }

    const compras = [];

    for (let i = 0; i < numCompras; i++) {
        const producto = prompt(`Ingrese el nombre del producto (producto1, producto2 o producto3) para la compra ${i + 1}:`);
        const cantidad = parseInt(prompt(`Ingrese la cantidad que desea comprar del ${producto}:`));

        // Verificar si el producto ingresado es válido
        if (productos.hasOwnProperty(producto) && !isNaN(cantidad) && cantidad > 0) {
            compras.push({ producto, cantidad });
        } else {
            alert('Producto inválido o cantidad no válida. Por favor, inténtelo nuevamente.');
            i--; // Restar uno para repetir la iteración para este producto
        }
    }

    // Calcular el costo total usando reduce
    const totalCosto = compras.reduce((total, compra) => {
        return total + calcularCostoTotal(compra.producto, compra.cantidad);
    }, 0);

    // Mostrar el costo total de cada compra y el total general
    compras.forEach(compra => {
        const costoTotal = calcularCostoTotal(compra.producto, compra.cantidad);
        console.log(`El costo total de la compra del ${compra.producto} es: $${costoTotal.toFixed(2)}`);
    });

    alert(`El costo total de todas las compras es: $${totalCosto.toFixed(2)}`);
}

// Ejecutar la simulación de compra al cargar la página
simularCompra();
