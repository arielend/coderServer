import { Router } from 'express'
import productsManager from '../../data/fs/ProductsManager.js'

const productsRouter = Router()

productsRouter.get('/', async (request, response, next) => {
    
    try {
        const products = await productsManager.read()

        return response.render('products', { products })        
    } catch (error) {
        return next(error)
    }

})

productsRouter.get('/real', async (request, response, next) => {
    try {

        return response.render('realProducts')

    } catch (error) {
        return next(error)
        
    }
})

productsRouter.get('/:id', async (request, response, next ) => {

    try {

        const { id } = request.params
        const product = await productsManager.readOne(id)

        return response.render('productDetail', { product })
        
    } catch (error) {
        return next(error)
    }
})

export default productsRouter