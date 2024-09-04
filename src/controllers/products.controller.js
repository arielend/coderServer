import { 
    createService,
    destroyService,
    paginateService,
    readService,
    readOneService,
    updateService,
    readLastService
} from '../services/products.service.js'

class ProductsController {

    async create ( request, response, next ) {
        try {

            const data = request.body
            data.supplier_id = request.user._id
            const one = await createService(data)

            if(one){
                return response.response201(one)
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

            let _id = undefined
            let role = undefined            
            const user = request.user ? request.user : undefined

            if (user) {
                _id = user._id
                role = user.role
            }
            
            let filter = ((_id && role) && (role == 'prem')) ? { supplier_id: { $ne: _id } } : {}
            let options = {}

            request.query.page && (options.page = request.query.page)
            request.query.sort && (options.sort = request.query.sort)
            request.query.limit && (options.limit = request.query.limit)
            request.query.prevPage && (options.prevPage = request.query.prevPage)
            request.query.nextPage && (options.nextPage = request.query.nextPage )
            
            if (request.query.filter) {
                const queryFilter = JSON.parse(request.query.filter)
                filter = { ...filter, ...queryFilter }
            }

            const data = await paginateService(filter, options)
            return response.paginate(data)
            
        } catch (error) {
            return next(error)
        }
    }

    async read (request, response, next) {
        try {
            const filter = {
                supplier_id: request.user._id
            }
            const many = await readService(filter)

            if (many) {
                return response.response200(many)
            }
            else{
                return response.error404()
            }            
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
    read,
    readOne,
    update,
    readLast
} = productsController