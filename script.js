document.addEventListener("DOMContentLoaded", function() {
    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");

    productForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const productName = document.getElementById("productName").value;
        const productPrice = document.getElementById("productPrice").value;
        const productImage = document.getElementById("productImage").value;

        const product = {
            name: productName,
            price: productPrice,
            imageUrl: productImage
        };

        addProduct(product);
        saveProduct(product);
        productForm.reset();
    });

    function addProduct(product) {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        const productImage = document.createElement("img");
        productImage.src = product.imageUrl;
        productCard.appendChild(productImage);

        const productName = document.createElement("h3");
        productName.textContent = product.name;
        productCard.appendChild(productName);

        const productPrice = document.createElement("p");
        productPrice.textContent = `Precio: $${product.price}`;
        productCard.appendChild(productPrice);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", function() {
            deleteProduct(product);
            productCard.remove();
        });
        productCard.appendChild(deleteButton);

        productList.appendChild(productCard);
    }

    function saveProduct(product) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
    }

    function deleteProduct(productToDelete) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products = products.filter(product => product.name !== productToDelete.name);
        localStorage.setItem("products", JSON.stringify(products));
    }

    function loadProducts() {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.forEach(product => addProduct(product));
    }

    loadProducts();
});
