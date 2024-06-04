import CustomRouter from '../CustomRouter.js'

import productsManager from '../../data/mongo/managers/productsManager.js'
import uploader from '../../middlewares/multer.js'
import isPhoto from '../../middlewares/isPhoto.js'
import productFieldsValidate from '../../middlewares/productFieldsValidate.js'
import passport from '../../middlewares/passport.js'

class ProductsRouter extends CustomRouter {

    init() {
        //this.read('/', ['PUBLIC'], read)
        this.paginate('/', ['PUBLIC'], passport.authenticate('jwt', { session: false }), paginate)
        this.readOne('/:id', ['PUBLIC'], passport.authenticate('jwt', { session: false }), readOne)
        this.create('/', ['ADMIN'], passport.authenticate('jwt', { session: false }), uploader.single('photo'), isPhoto, productFieldsValidate, create)
        this.update('/:id', ['ADMIN'], passport.authenticate('jwt', { session: false }), update)
        this.destroy('/:id', ['ADMIN'], passport.authenticate('jwt', { session: false }), destroy)
    }
}

async function read( request, response, next ) {

    try {
        const { category } = request.query
        const allProducts = category ? await productsManager.read(category) : await productsManager.read()

        if(allProducts.length !== 0) {
            return response.status200(allProducts)
        }
        else 
        {
            return response.status400()
        }
    } catch (error) {
        return next(error)
    }
}

async function paginate (request, response, next) {

    console.log('paginando productos en api')
    console.log('Que llega en requestuser')


    const user = request.user

    try {
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
        pagination.totalDocs = result.totalDocs
        pagination.totalPages = result.totalPages
        pagination.prevPage = result.prevPage
        pagination.nextPage = result.nextPage

        return response.render('products', {title: "CoderServer | Products" , products, pagination, user} )
        
    } catch (error) {
        return next(error)
    }
}

async function readOne ( request, response, next ) {

    try {

        const { id } = request.params
        const foundProduct = await productsManager.readOne(id, next)

        if (foundProduct) {
            return response.status200(foundProduct)
        } 
        else
        {
            return response.status404()
        }

    } catch (error) {
        return next(error)
    }
}

async function create (request, response, next) {

    try {

        const data = request.body
        const product = await productsManager.create(data, next)

        return response.status201(`Product created with ID ${product.id}`)

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
            return response.status200(updatedProduct)
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
            return response.status404()
        } else {
            const deletedProduct = await productsManager.destroy(id)
            if(deletedProduct){
                return response.status204(`Product ID ${id} succesfully deleted.`)
            }
        }
        
    } catch (error) {
        return next(error)
    }
}

const productsRouter = new ProductsRouter()

export default productsRouter.getRouter()