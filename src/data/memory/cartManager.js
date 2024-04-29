class CartManager {
    static #cartItems = [];
    
    addProduct(product, quantity) {
        try {
            const item = {
                id: CartManager.#cartItems.length === 0 ? 1 : CartManager.#cartItems[CartManager.#cartItems.length - 1].id + 1,
                product,
                quantity
            };
            CartManager.#cartItems.push(item);
            console.log('Producto agregado al carrito');
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        }
    }

    removeProduct(id) {
        try {
            const index = CartManager.#cartItems.findIndex(item => item.id === id);
            if (index === -1) {
                throw new Error("Producto no encontrado en el carrito");
            } else {
                CartManager.#cartItems.splice(index, 1);
                console.log("Producto eliminado del carrito");
            }
        } catch (error) {
            console.error(error);
        }
    }

    viewCart() {
        try {
            if (CartManager.#cartItems.length === 0) {
                throw new Error("El carrito está vacío");
            } else {
                return CartManager.#cartItems;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

const cartManager = new CartManager();

// Ejemplo de uso:
const product1 = {
    title: "Tarjeta Gráfica AMD Radeon RX 6800 XT",
    photo: "/images/no_photo.svg",
    category: "graphics_cards",
    price: 160000,
    stock: 8
};

const product2 = {
    title: "Motherboard ASUS ROG Strix Z590-E Gaming",
    photo: "/images/no_photo.svg",
    category: "motherboards",
    price: 30000,
    stock: 15
};

cartManager.addProduct(product1, 2);
cartManager.addProduct(product2, 1);

console.log(cartManager.viewCart());
cartManager.removeProduct(1);
console.log(cartManager.viewCart());