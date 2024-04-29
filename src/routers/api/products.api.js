import { Router } from 'express'
import productsManager from '../../data/mongo/managers/productsManager.js'
import uploader from '../../middlewares/multer.js'
import isPhoto from '../../middlewares/isPhoto.js'
import productFieldsValidate from '../../middlewares/productFieldsValidate.js'

const productsRouter = Router()

productsRouter.get('/', read)
productsRouter.get('/:id', readOne)
productsRouter.post('/', uploader.single('photo'), isPhoto, productFieldsValidate, create)
productsRouter.put('/:id', update)
productsRouter.delete('/:id', destroy)

async function read( request, response, next ) {

    try {

        const { category } = request.query
        const allProducts = category ? await productsManager.read(category) : await productsManager.read()

        if (allProducts.length !== 0) {
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
        return next(error)
    }
}

async function readOne ( request, response, next ) {

    try {

        const { id } = request.params

        const foundProduct = await productsManager.readOne(id, next)

        if (foundProduct) {
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
        return next(error)
    }
}

async function create (request, response, next) {

    try {

        const data = request.body
        const product = await productsManager.create(data, next)

        return response.json({
            statusCode: 201,
            succes: true,
            message: `Product created with ID ${product.id}`
        })
        
    } catch (error) {
        return next(error)
    }
}

async function update (request, response, next) {

    try {

        const data = request.body
        const { id } = request.params
        const updatedProduct = await productsManager.update(id, data, next)

        if(updatedProduct) {
            return response.json({
                statusCode: 200,
                succes: true,
                response: updatedProduct
            })
        }        
        
    } catch (error) {
        return next(error)
    }
}

async function destroy (request, response, next) {
    try {

        const { id } = request.params
        const foundProduct = await productsManager.readOne(id, next)

        if (!foundProduct) {
            const error = new Error(`Product id ${id} not found`)
            error.statusCode = 404
            throw error
        } else {
            const deletedProduct = await productsManager.destroy(id)
            return response.json({
                statusCode: 200,
                succes: true,
                message: `Product ID ${id} succesfully deleted.`
            })
        }
        
    } catch (error) {
        return next(error)
    }
}

export default productsRouter