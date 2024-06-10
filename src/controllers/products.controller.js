import { createService, destroyService, paginateService, readOneService, readService, updateService } from '../services/products.service.js'

async function read( request, response, next ) {

    try {
        const { category } = request.query
        const allProducts = category ? await readService(category) : await productsManager.read()

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

    const user = request.user

    try {
        const sortAndPaginate = {}
        request.query.limit && (sortAndPaginate.limit = request.query.limit)
        request.query.page && (sortAndPaginate.page = request.query.page)
        request.query.prevPage && (sortAndPaginate.prevPage = request.query.prevPage)
        request.query.nextPage && (sortAndPaginate.nextPage = request.query.nextPage )

        const filter = {}
        request.query.category && (filter.category = request.query.category)

        const result = await paginateService({filter, sortAndPaginate})
        let products = result.docs.map( product => product.toObject())

        //Defino el objeto pagination con las propiedades de paginate
        let pagination = {}
        pagination.page = result.page
        pagination.totalDocs = result.totalDocs
        pagination.totalPages = result.totalPages
        pagination.prevPage = result.prevPage
        pagination.nextPage = result.nextPage

        return response.status200(products)
        //return response.render('products', {title: "CoderServer | Products" , products, pagination, user} )
        
    } catch (error) {
        return next(error)
    }
}

async function readOne ( request, response, next ) {

    try {

        const { id } = request.params
        const foundProduct = readOneService(id, next)

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
        const product = await createService(data, next)

        return response.status201(`Product created with ID ${product.id}`)

    } catch (error) {
        return next(error)
    }
}

async function update (request, response, next) {

    try {

        const data = request.body
        const { id } = request.params
        const updatedProduct = await updateService(id, data, next)

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
        const foundProduct = await destroyService(id, next)

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

export { read, paginate, readOne, create, update, destroy }