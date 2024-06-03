import CustomRouter from '../CustomRouter.js'
import productsManager from '../../data/mongo/managers/productsManager.js'
import passport from '../../middlewares/passport.js'


class ProductsRouter extends CustomRouter {

    init() {
        this.paginate('/', ['PUBLIC'], passport.authenticate('jwt', { session: false }), paginate)
        this.readOne('/:id', ['PUBLIC'], passport.authenticate('jwt', { session: false }), readOne)
    }
}

async function paginate (request, response, next) {

    console.log('paginando productos en view')
    
    try {
        const user = request.user
        
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
        
        return response.render('products', {title: "CoderServer | Products", products, pagination, user })
        
    } catch (error) {
        return next(error)
    }    
}

async function readOne (request, response, next ) {
    
    try {
        const { id } = request.params
        const user = request.user
        const product = await productsManager.readOne(id)
        return response.render('productDetail', { product, user })
        
    } catch (error) {
        return next(error)
    }
}

const productsRouter = new ProductsRouter()
export default productsRouter.getRouter()