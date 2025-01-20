let cart = [];

// Function to change the quantity of products
function changeQuantity(product, action) {
    const productElement = document.getElementById(`${product}-quantity`);
    let currentQuantity = parseInt(productElement.innerText);

    if (action === 'increase') {
        currentQuantity++;
    } else if (action === 'decrease' && currentQuantity > 0) {
        currentQuantity--;
    }

    // Update the quantity in the product display
    productElement.innerText = currentQuantity;

    // Update the cart if the quantity changes
    const size = document.getElementById(`${product}-size`).dataset.size || '250gm'; // Default to 250gm if size is not selected
    const productIndex = cart.findIndex(item => item.name === product && item.size === size);

    if (productIndex !== -1) {
        // Update the quantity of the product in the cart
        cart[productIndex].quantity = currentQuantity;
    }
}

// Function to update the selected quantity size (250gm or 500gm)
function changeQuantitySize(product) {
    const sizeElement = document.getElementById(`${product}-size`);
    const selectedSize = sizeElement.value; // Get the selected size (250gm or 500gm)
    sizeElement.dataset.size = selectedSize; // Store the selected size in the data attribute
}

// Function to add products to the cart
function addToCart(product) {
    const size = document.getElementById(`${product}-size`).dataset.size || '250gm'; // Default to 250gm if size is not selected
    const quantity = parseInt(document.getElementById(`${product}-quantity`).innerText);

    if (quantity > 0) {
        // Check if product already exists in the cart with the same size
        const existingProductIndex = cart.findIndex(item => item.name === product && item.size === size);
        if (existingProductIndex !== -1) {
            // Update the quantity if the product is already in the cart
            cart[existingProductIndex].quantity += quantity;
        } else {
            // Add new product to the cart
            cart.push({ name: product, size: size, quantity: quantity });
        }
        alert(`${quantity} x ${product} (${size}) added to cart!`);
        updateCartDisplay();
    } else {
        alert('Please select a quantity first.');
    }
}

// Function to update the cart display
function updateCartDisplay() {
    const cartDetails = document.getElementById('cart-details');
    if (cart.length === 0) {
        cartDetails.innerHTML = '<p>No items in your cart yet.</p>';
    } else {
        cartDetails.innerHTML = cart.map(item => 
            `<p>${item.quantity} x ${item.name} (${item.size})</p>`
        ).join('');
        updateWhatsAppLink();
    }
}

// Function to update the WhatsApp link with cart details
function updateWhatsAppLink() {
    const cartDetails = cart.map(item => `${item.quantity} x ${item.name} (${item.size})`).join('%20and%20');
    const whatsappLink = `https://wa.me/message/YU4CX3MC4B3RG1?text=I%20want%20to%20order%20${cartDetails}%2C%20Please%20send%20details`;
    document.getElementById('whatsapp-link').href = whatsappLink;
}
