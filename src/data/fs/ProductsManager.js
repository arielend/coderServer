import fs from 'fs'
import crypto from 'crypto'

class ProductsManager {

    constructor() {
        this.path = './src/data/fs/files/products.json',
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
                const error = new Error('The create method requires a data object that has not been passed as a parameter.')
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

                console.log(`Product created with ID: ${product.id} at path ${this.path}`)
                return product

            }
        }
        catch(error) {
            console.log(`An error has ocurred at create a new product: ${error}`)
            throw error            
        }
    }

    async read (category = null) {

        try {

            let allProducts = await fs.promises.readFile(this.path, 'utf-8')
            allProducts = JSON.parse(allProducts)

            if(allProducts.length === 0) {
                const error = new Error ('Product inventory is empty.')
                throw error
            } else {
                if(!category){
                    return allProducts
                } else {
                    const filteredProducts = allProducts.filter(product => product.category === category)
                    return filteredProducts
                }
            }
            
        } catch (error) {
            console.log(`Error while reading product inventory: ${error}`)
            return []
        }
    }

    async readOne(id) {
        
        try {

            if(!id) {
                const error = new Error('The ID parameter is required by the readOne method.')
                throw error
            }

            let allProducts = await fs.promises.readFile(this.path, 'utf-8')
            allProducts = JSON.parse(allProducts)
            
            if(allProducts.length === 0) {
                const error = new Error ('No products to show. Empty inventary')
                throw error
            } else {

                const foundProduct = allProducts.find ( product => product.id === id)

                if(!foundProduct) {
                    console.log(`Product ID ${id} not found.`)
                    return null
                } else {
                    console.log('Found product: ', foundProduct)
                    return foundProduct
                }
            }
            
        } catch (error) {
            console.log(`An error has ocurred while reading products: ${error}`)
        }
    }

    async destroyOne (id) {

        if(!id) {
            const error = new Error('The ID parameter is required by the destroyOne method.')
            throw error
        }

        try {

            let allProducts = await fs.promises.readFile(this.path, 'utf-8')
            allProducts = JSON.parse(allProducts)

            if(allProducts.length === 0) {
                const error = new Error ('No products to show. Empty inventary')
                throw error
            } else {
                const foundProduct = allProducts.find ( product => product.id === id)

                if(!foundProduct) {
                    console.log(`Product ID ${id} not found to delete.`)
                } else {

                    let productsUpdated = allProducts.filter ( user => user.id !== id)
                    productsUpdated = JSON.stringify(productsUpdated, null, 4)

                    await fs.promises.writeFile(this.path, productsUpdated)
                    console.log(`Product ID ${id} has been deleted.`)
                    return foundProduct

                }
            }
            
        } catch (error) {
            console.log(`An error has ocurred while reading products: ${error}`)
        }
    }
    
    
}

const productsManager = new ProductsManager()
export default productsManager