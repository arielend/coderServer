class ProductManager {
    static #products = [];
    create(data) {
        try {
            const product = {
                id:
                    ProductManager.#products.length === 0
                    ? 1
                    : ProductManager.#products[ProductManager.#products.length -1].id + 1,
                title : data.title,
                photo : data.photo,
                category : data.category,
                price : data.price,
                stock : data.stock
            };
            ProductManager.#products.push(product);
            console.log('Producto creado');
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    }
    read(){
        return ProductManager.#products;
    }
}

const gestorDeProductos = new ProductManager()
gestorDeProductos.create({
    title: 'Pro Plan Adultos 7kg',
    photo: './proplanA7.jpg',
    category: 'Alimento',
    price: 40000,
    stock: 39
});

gestorDeProductos.create({
    title: 'Royal Canin Adultos 7kg',
    photo: './royalcaninA7.jpg',
    category: 'Alimento',
    price: 45000,
    stock: 20
});
gestorDeProductos.create({
    title: 'Pro Plan Cachorros 7kg',
    photo: './proplanC7.jpg',
    category: 'Alimento',
    price: 40000,
    stock: 8
}),
gestorDeProductos.create({
    title: 'Colchoneta grande',
    photo: './colchonetaG.jpg',
    category: 'Accesorios',
    price: 31000,
    stock: 100
}),
gestorDeProductos.create({
    title: 'Ratón de peluche',
    photo: './raton.jpg',
    category: 'Juguetes',
    price: 5000,
    stock: 300
})

console.log(gestorDeProductos.read())