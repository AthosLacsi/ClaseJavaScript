document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById('product-form');
    const productSelect = document.getElementById('product-select');
    const quantityInput = document.getElementById('product-quantity');
    const productList = document.getElementById('product-list');
    const totalPriceElement = document.getElementById('total-price');
    const purchaseButton = document.getElementById('purchase-button');
    let total = 0;

    const products = {
        "Muñeco Frutilla - 7000": 7000,
        "Muñeco Pikachu - 8900": 8900,
        "Muñeco Luffy - 12000": 12000
    };

    // Función para cargar productos desde el almacenamiento local
    function loadProducts() {
        let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        storedProducts.forEach(addProductToDOM);
        updateTotalPrice();
    }

    // Función para agregar producto al DOM
    function addProductToDOM(product) {
        const li = document.createElement('li');
        li.textContent = `${product.name} x${product.quantity} - $${product.price * product.quantity}`;
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete');
        li.appendChild(deleteBtn);
        productList.appendChild(li);
    }

    // Función para guardar productos en el almacenamiento local
    function saveProducts() {
        const storedProducts = [];
        productList.querySelectorAll('li').forEach(li => {
            const [nameQuantity, price] = li.firstChild.textContent.split(' - $');
            const [name, quantity] = nameQuantity.split(' x');
            storedProducts.push({ name, quantity: parseInt(quantity), price: products[name] });
        });
        localStorage.setItem('products', JSON.stringify(storedProducts));
    }

    // Función para actualizar el precio total
    function updateTotalPrice() {
        total = 0;
        productList.querySelectorAll('li').forEach(li => {
            const [, price] = li.firstChild.textContent.split(' - $');
            total += parseFloat(price);
        });
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Evento para agregar un nuevo producto
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedProduct = productSelect.value;
        const productQuantity = parseInt(quantityInput.value);
        if (selectedProduct && !isNaN(productQuantity)) {
            const productPrice = products[selectedProduct];
            addProductToDOM({ name: selectedProduct, quantity: productQuantity, price: productPrice });
            saveProducts();
            updateTotalPrice();
            productSelect.value = '';
            quantityInput.value = '';
            // Mostrar alerta de éxito
            Swal.fire({
                icon: "success",
                title: "Producto agregado",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

    // Evento para eliminar un producto
    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            // Mostrar alerta de confirmación
            Swal.fire({
                title: "¿Estás seguro?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Sí, bórralo!",
                customClass: {
                    popup: 'swal-center',
                    actions: 'swal-actions-center'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Elimina el producto solo si el usuario confirma
                    e.target.parentElement.remove();
                    saveProducts();
                    updateTotalPrice();
                    // Mostrar alerta de éxito
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El producto ha sido eliminado.",
                        icon: "success",
                        customClass: {
                            popup: 'swal-center',
                            actions: 'swal-actions-center'
                        }
                    });
                }
            });
        }
    });

    // Evento para realizar la compra
    purchaseButton.addEventListener('click', () => {
        if (total > 0) {
            Swal.fire({
                title: "Compra realizada",
                text: `El total de tu compra es $${total.toFixed(2)}`,
                icon: "success",
                customClass: {
                    popup: 'swal-center',
                    actions: 'swal-actions-center'
                }
            }).then(() => {
                // Reiniciar la lista de productos y el total
                productList.innerHTML = '';
                saveProducts();
                updateTotalPrice();
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "No hay productos en la lista.",
                icon: "error",
                customClass: {
                    popup: 'swal-center',
                    actions: 'swal-actions-center'
                }
            });
        }
    });

    // Cargar productos guardados al inicio
    loadProducts();
});
