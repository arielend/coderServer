import { Router } from 'express'
import productsManager from '../../data/mongo/managers/productsManager.js'
const productsRouter = Router()

productsRouter.get('/', async (request, response, next) => {
    
    try {
        const user = request.session

        const sortAndPaginate = {}
        request.query.limit && (sortAndPaginate.limit = request.query.limit)
        request.query.page && (sortAndPaginate.page = request.query.page)
        request.query.prevPage && (sortAndPaginate.prevPage = request.query.prevPage)
        request.query.nextPage && (sortAndPaginate.nextPage = request.query.nextPage )

        const filter = {}
        request.query.category && (filter.category = request.query.category)

        const result = await productsManager.paginate({filter, sortAndPaginate})
        let products = result.docs.map( product => product.toObject())

        //Defino el objeto pagination con las propiedades de paginate
        let pagination = {}
        pagination.page = result.page
        pagination.totalPages = result.totalPages
        pagination.prevPage = result.prevPage
        pagination.nextPage = result.nextPage

        console.log('Esto es pagination en view products: ', pagination)

        return response.render('products', { products, pagination, user })
        
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