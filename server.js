import express from 'express'
import productsManager from './app/fs/ProductsManager.js'

const server = express()
const port = 8080
const ready = () => { console.log(`Server ready on http://localhost:${port}/`) }

server.listen(port, ready)

// Middleware
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

//Endpoints de ProductsManager
server.get('/', async (request, response) => {
    try {
        
        return response.json({
            statusCode: 200,
            succes: true,
            response: 'Home Page Ok'
        })
        
    } catch (error) {
        console.log(`An error has ocurred: ${error}`)
        return response.json({
            statusCode: error.statusCode || 'Error 500',
            succes: false,
            message: error.message || `An error has ocurred: ${error}`
        })        
    }
})

server.get('/api/products', async (request, response) => {
    
    try {
        
        const { category } = request.query
        const allProducts = category ? await productsManager.read(category) : await productsManager.read()
        
        if(allProducts.length !== 0) {
            return response.json({
                statusCode: 200,
                succes: true,
                response: allProducts
            })
        } else {
            const error = new Error('No products to show.')
            error.statusCode = 404
            throw error
        }        
    } catch (error) {
        console.log(`An error has ocurred: ${error}`)
        return response.json({
            statusCode: error.statusCode || 'Error 500',
            response: null,
            message: error.message || `An error has ocurred: ${error}`
        })        
    }
})

server.get('/api/products/:id', async (request, response) => {
    try {
        
        const { id } = request.params
        const foundProduct = await productsManager.readOne(id)
        
        if(foundProduct) {
            return response.json({
                statusCode: 200,
                succes: true,
                response: foundProduct
            })
            
        } else {
            const error = new Error(`Product id ${id} not found`)
            error.statusCode = 404
            throw error
        }
        
    } catch (error) {
        console.log(`An error has ocurred: ${error}`)
        return response.json({
            statusCode: error.statusCode || 'Error 500',
            response: null,
            message: error.message || `An error has ocurred: ${error}`
        })        
    }
})

//Endpoints de UsersManager






//Para manejar rutas inexistentes
server.use((request, response, next) => {

    const error = new Error('Page not Found')
    error.statusCode = 404
    next(error)
})

//Para capturar errores y devolver un objeto response con mensaje
server.use((error, request, response, next) => {
    response.json({
        statusCode: error.statusCode || 'Error 500',
        response: null,
        message: error.message || `An error has occurred: ${error}`
    })
})