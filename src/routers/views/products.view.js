import { Router } from 'express'
import productsManager from '../../data/mongo/managers/productsManager.js'
const productsRouter = Router()

productsRouter.get('/', async (request, response, next) => {
    
    try {
        const user = request.session
        const products = await productsManager.read()
        return response.render('products', { products, user })
        
    } catch (error) {
        return next(error)
    }

})

productsRouter.get('/real', async (_request, response, next) => {
    try {

        return response.render('productsLoad')

    } catch (error) {
        return next(error)
        
    }
})

productsRouter.get('/:id', async (request, response, next ) => {

    try {
        const { id } = request.params
        const user = request.session
        const product = await productsManager.readOne(id)
        return response.render('productDetail', { product, user })
        
    } catch (error) {
        return next(error)
    }
})

export default productsRouter