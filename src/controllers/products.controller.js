import { createService, destroyService, paginateService, readOneService, readService, updateService } from '../services/products.service.js'

class ProductsController {

    async read(request, response, next ) {
        try {
            const { category } = request.query
            const allProducts = category ? await readService(category) : await readService()
            
            if(allProducts.length !== 0) {
                return response.response200(allProducts)
            }
            else 
            {
                return response.error400()
            }
        } catch (error) {
            return next(error)
        }
    }

    async paginate (request, response, next) {

        try {
            const sortAndPaginate = {}
            request.query.limit && (sortAndPaginate.limit = request.query.limit)
            request.query.page && (sortAndPaginate.page = request.query.page)
            request.query.prevPage && (sortAndPaginate.prevPage = request.query.prevPage)
            request.query.nextPage && (sortAndPaginate.nextPage = request.query.nextPage )

            let filter = {}

            if(request.query.filter){
                filter = JSON.parse(request.query.filter)
            }
            
            const result = await paginateService({filter, sortAndPaginate})

            return response.response200(result)

        } catch (error) {
            return next(error)
        }
    }

    async readOne ( request, response, next ) {

        try {

            const { id } = request.params
            const foundProduct = await readOneService(id, next)

            if (foundProduct) {
                return response.response200(foundProduct)
            } 
            else
            {
                return response.error404()
            }

        } catch (error) {
            return next(error)
        }
    }

    async create (request, response, next) {

        try {

            const data = request.body
            const product = await createService(data, next)

            return response.message201(`Product created with ID ${product.id}`)

        } catch (error) {
            return next(error)
        }
    }

    async update (request, response, next) {

        try {

            const data = request.body
            const { id } = request.params
            const updatedProduct = await updateService(id, data, next)

            if(updatedProduct) {
                return response.response200(updatedProduct)
            }        
            
        } catch (error) {
            return next(error)
        }
    }

    async destroy (request, response, next) {
        try {

            const { id } = request.params
            const foundProduct = await destroyService(id, next)

            if (!foundProduct) {
                return response.error404()
            } else {
                const deletedProduct = await productsManager.destroy(id)
                if(deletedProduct){
                    return response.message204(`Product ID ${id} succesfully deleted.`)
                }
            }
            
        } catch (error) {
            return next(error)
        }
    }
}

const productsController = new ProductsController()
export const { read, paginate, readOne, create, update, destroy } = productsController