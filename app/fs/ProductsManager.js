const fs = require('fs')
const crypto = require('crypto')

class ProductsManager {

    constructor() {
        this.path = './app/fs/files/products.json',
        this.init()
    }

    init () {

        const exists = fs.existsSync(this.path)

        if(!exists) {
            const products = []
            const productsString = JSON.stringify(products, null, 4)
            fs.writeFileSync(this.path, productsString)
            console.log(`File in path ${this.path} has been created`)
        } else {
            console.log(`File in path ${this.path} already exists.`)
        }
    }

    async create (data) {

        try {

            if(!data) {
                const error = new Error('No se ha pasado el objeto data que la clase necesita para crear el producto.')
                throw error
            }

            if(!data.title || !data.category || !data.price ){
                const error = new Error('Title, Category and Price fields are required.')
                throw error
            } else {

                const product = {
                    id: crypto.randomBytes(12).toString('hex'),
                    title: data.title,  
                    photo: data.photo || './products/noPhoto.jpg',
                    category: data.category,
                    price: data.price,
                    stock: data.stock || 0
                }

                let products = await fs.promises.readFile(this.path, 'utf-8')
                products = JSON.parse(products)
                products.push(product)
                products = JSON.stringify(products, null, 4)

                await fs.promises.writeFile(this.path, products)

                console.log(`Producto creado con ID: ${product.id} at path ${this.path}`)

            }
        }
        catch(error) {
            console.log(`An error has ocurred at create a new product: ${error}`)
            throw error
        }
    }

    async read () {

        try {

            let allProducts = await fs.promises.readFile(this.path, 'utf-8')
            allProducts = JSON.parse(allProducts)

            if(allProducts.length === 0) {
                const error = new Error ('No hay productos registrados')
                throw error
            } else {
                console.log(allProducts)
            }
            
        } catch (error) {
            console.log(`Error al leer la lista de productos: ${error}`)
        }
    }

    async readOne(id) {
        
        try {

            if(!id) {
                const error = new Error('No se ha pasado un id que permita identificar el producto a leer.')
                throw error
            }

            let allProducts = await fs.promises.readFile(this.path, 'utf-8')
            allProducts = JSON.parse(allProducts)
            
            if(allProducts.length === 0) {
                const error = new Error ('No hay productos registrados')
                throw error
            } else {

                const foundProduct = allProducts.find ( product => product.id === id)

                if(!foundProduct) {
                    console.log(`No se encontró producto con el ID ${id} que mostrar`)
                } else {
                    console.log('Producto encontrado: ', foundProduct)
                    return foundProduct
                }
            }
            
        } catch (error) {
            console.log(`Error al leer la lista de productos: ${error}`)
        }
    }

    async destroyOne (id) {

        if(!id) {
            const error = new Error('No se ha pasado un id que permita identificar el producto a eliminar.')
            throw error
        }

        try {

            let allProducts = await fs.promises.readFile(this.path, 'utf-8')
            allProducts = JSON.parse(allProducts)

            if(allProducts.length === 0) {
                const error = new Error ('No hay productos registrados')
                throw error
            } else {
                const foundProduct = allProducts.find ( product => product.id === id)

                if(!foundProduct) {
                    console.log(`No se encontró producto con el ID ${id} que eliminar`)
                } else {

                    let productsUpdated = allProducts.filter ( user => user.id !== id)
                    productsUpdated = JSON.stringify(productsUpdated, null, 4)

                    await fs.promises.writeFile(this.path, productsUpdated)
                    console.log('Se ha eliminado el producto con ID: ', id)
                    return foundProduct

                }
            }
            
        } catch (error) {
            console.log(`Error al leer la lista de productos: ${error}`)
        }
    }
}

async function run () {

    try {

        const products = new ProductsManager()

        await products.create({
            title: 'Monitor LG UltraGear 27GL850-B',
            photo: './products/lg_ultragear_monitor.jpg',
            category: 'monitors',
            price: 40000,
            stock: 15
        })
        
        await products.create({
            title: 'Graphics Card NVIDIA GeForce RTX 3080',
            photo: './products/nvidia_rtx_3080.jpg',
            category: 'graphics_cards',
            price: 150000,
            stock: 7
        })
        
        await products.create({
            title: 'Gaming Mouse Razer DeathAdder V2',
            photo: './products/razer_deathadder_v2.jpg',
            category: 'mice',
            price: 8000,
            stock: 20
        })
        
        await products.create({
            title: 'Mechanical Keyboard Corsair K95 RGB Platinum',
            photo: './products/corsair_k95_rgb_platinum.jpg',
            category: 'keyboards',
            price: 12000,
            stock: 18
        })
        
        await products.create({
            title: 'External SSD Samsung T7 Touch 1TB',
            photo: './products/samsung_t7_touch_ssd.jpg',
            category: 'external_storage',
            price: 7000,
            stock: 25
        })
        
        await products.create({
            title: 'Wi-Fi Router TP-Link Archer AX6000',
            photo: './products/tp_link_archer_ax6000.jpg',
            category: 'routers',
            price: 15000,
            stock: 14
        })

        await products.create({
            title: 'External Hard Drive Seagate Expansion 4TB',
            photo: './products/seagate_expansion_4tb.jpg',
            category: 'external_storage',
            price: 6000,
            stock: 20
        })
        
        await products.create({
            title: 'Wireless Keyboard Logitech MX Keys',
            photo: './products/logitech_mx_keys.jpg',
            category: 'keyboards',
            price: 8000,
            stock: 15
        })
        
        await products.create({
            title: 'Webcam Logitech C920 HD Pro',
            photo: './products/logitech_c920_webcam.jpg',
            category: 'accessories',
            price: 5000,
            stock: 15
        })
        
        await products.create({
            title: 'Wireless Router ASUS RT-AX88U',
            photo: './products/asus_rt_ax88u_router.jpg',
            category: 'routers',
            price: 12000,
            stock: 10
        })

        await products.read()

        await products.readOne('id_inexistente')

        await products.destroyOne('id_inexistente')
        
    } catch (error) {
        console.log(`An error has ocurred: ${error}`)        
    }
}


async function test () {

    //Creación de producto con error - Llamada al método sin parámetro data
    try {
        const products = new ProductsManager()
        await products.create()        
    } catch (error) {
        console.log(`An error has ocurred: ${error}`)
    }

    //Creación de producto con error - Faltan propiedades requeridas
    try {
        const products = new ProductsManager()
        await products.create({
            title: '',
            photo: './products/lg_ultragear_monitor.jpg',
            category: 'monitors',
            price: 40000,
            stock: 15
        })
    } 
    catch (error) {
        console.log(`An error has ocurred: ${error}`)        
    }

    //Creación de producto con error - Llamada al método sin parámetro data
    try {
        const products = new ProductsManager()
        await products.create()
    } 
    catch (error) {
        console.log(`An error has ocurred: ${error}`)        
    }

    //Lectura de un producto con error - Llamada al método sin parámetro id
    try {
        const products = new ProductsManager()
        await products.readOne()
    } 
    catch (error) {
        console.log(`An error has ocurred: ${error}`)        
    }

    //Eliminación de un producto con error - Llamada al método sin parámetro id
    try {
        const products = new ProductsManager()
        await products.destroyOne()
    } 
    catch (error) {
        console.log(`An error has ocurred: ${error}`)        
    }

}

test()
// run()