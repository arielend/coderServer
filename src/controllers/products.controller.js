import { 
    createService,
    destroyService,
    paginateService,
    readOneService,
    updateService,
    readLastService
} from '../services/products.service.js'

class ProductsController {

    async create ( request, response, next ) {
        try {
            console.log('Entramos al product create?')
            const data = request.body
            const one = await createService(data)
            if(one){
                return response.message201('Product created!')
            }            
        } catch (error) {
            return next(error)
        }
    }

    async destroy ( request, response, next ) {
        try {
            const { id } = request.params 
            const one = await destroyService(id)
            if(one){
                return response.message204('Product deleted!')
            }
            else{
                return response.error404()
            }
        } catch (error) {
            return next(error)
        }
    }

    async paginate ( request, response, next ) {
        try {
            const options = {}
            request.query.page && (options.page = request.query.page)
            request.query.sort && (options.sort = request.query.sort)
            request.query.limit && (options.limit = request.query.limit)
            request.query.prevPage && (sortAndPaginate.prevPage = request.query.prevPage)
            request.query.nextPage && (sortAndPaginate.nextPage = request.query.nextPage )
            
            const filter = {}
            request.query.filter && (filter = JSON.parse(request.query.filter))

            const data = await paginateService(filter, options)
            return response.paginate(data)
            
        } catch (error) {
            return next(error)
        }
    }

    async readOne ( request, response, next ) {
        try {
            const { id } = request.params
            const one = await readOneService(id)
            if (one) {
                return response.response200(one)
            }
            else{
                return response.error404()
            }
            
        } catch (error) {
            return next(error)
        }
    }

    async update ( request, response, next ) {
        try {
            const data = request.body
            const { id } = request.params
            const one = await updateService(id, data)
            if(one){
                return response.message204('Product updated!')
            }
            else{
                return response.error404()
            }
        } catch (error) {
            return next(error)
        }
    }

    async readLast ( request, response, next ) {
        try {
            const one = await readLastService()
            if(one){
                return response.response200(one)
            }
            else{
                return response.error404()
            }
        } catch (error) {
            return next(error)
        }
    }
}

const productsController = new ProductsController()
export const { 
    create,
    destroy,
    paginate,
    readOne,
    update,
    readLast
} = productsController