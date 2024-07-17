document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById('product-form');
    const productSelect = document.getElementById('product-select');
    const quantityInput = document.getElementById('product-quantity');
    const productList = document.getElementById('product-list');
    const totalPriceElement = document.getElementById('total-price');
    const purchaseButton = document.getElementById('purchase-button');
    let total = 0;
    let products = [];

    function loadProducts() {
        fetch('scripts/product.json')
            .then(response => response.json())
            .then(data => {
                products = data;
                populateProductSelect();
                loadStoredProducts();
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    }

    function populateProductSelect() {
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.name;
            option.textContent = `${product.name} - $${product.price}`;
            productSelect.appendChild(option);
        });
    }

    function loadStoredProducts() {
        let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        storedProducts.forEach(addProductToDOM);
        updateTotalPrice();
    }

    function addProductToDOM(product) {
        const li = document.createElement('li');
        li.textContent = `${product.name} x${product.quantity} - $${product.price * product.quantity}`;
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete');
        li.appendChild(deleteBtn);
        productList.appendChild(li);
    }
    function saveProducts() {
        const storedProducts = [];
        productList.querySelectorAll('li').forEach(li => {
            const [nameQuantity, price] = li.textContent.split(' - $');
            const [name, quantity] = nameQuantity.split(' x');
            const product = products.find(p => p.name === name);
            if (product) {
                storedProducts.push({ name, quantity: parseInt(quantity), price: product.price });
            }
        });
        localStorage.setItem('products', JSON.stringify(storedProducts));
    }
    function updateTotalPrice() {
        total = 0;
        productList.querySelectorAll('li').forEach(li => {
            const [, price] = li.textContent.split(' - $');
            total += parseFloat(price);
        });
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedProductName = productSelect.value;
        const productQuantity = parseInt(quantityInput.value);
        const selectedProduct = products.find(p => p.name === selectedProductName);
        if (selectedProduct && !isNaN(productQuantity) && productQuantity > 0) {
            addProductToDOM({ name: selectedProductName, quantity: productQuantity, price: selectedProduct.price });
            saveProducts();
            updateTotalPrice();
            productSelect.value = '';
            quantityInput.value = '';
            Swal.fire({
                icon: "success",
                title: "Producto agregado",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'swal-center',
                    actions: 'swal-actions-center'
                }
            });
        }
    });


    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Sí, bórralo!",
                cancelButtonText: "Cancelar",
                customClass: {
                    popup: 'swal-center',
                    actions: 'swal-actions-center'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    e.target.parentElement.remove();
                    saveProducts();
                    updateTotalPrice();
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

    loadProducts();
});






