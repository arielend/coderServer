import { 
    createService,
    destroyManyService,
    destroyService,
    readOneService,
    readService,
    updateService
} from '../services/carts.service.js'

class CartsController {

    async create ( request, response, next ) {
        try {
            const data = request.body
            data.user_id = request.user._id
            const one = await createService(data)
            if(!one){
                return response.error404()
            }
            else{
                return response.message201(`Cart created. ID: ${one._id}.`)
            }
        } catch (error) {
            return next(error)
        }
    }

    async destroyMany ( request, response, next ) {
        try {
            const { _id } = request.user
            const result = await destroyManyService(_id)
            if(!result){
                return response.error404()
            }
            else{
                return response.message204('Cleaning up your cart!')
            }
        } catch (error) {
            return next(error)
        }
    }

    async destroy ( request, response, next ) {
        try {
            const { id } = request.params
            const one = await destroyService(id)
            if(!one){
                return response.error404()
            }
            else{
                return response.message204('Cart deleted!')
            }
        } catch (error) {
            return next(error)
        }
    }

    async readOne ( request, response, next ) {
        try {
            const { id } = request.params
            const one = await readOneService(id)
            if(!one){
                return response.error404()
            }
            else{
                return response.response200(one)
            }            
        } catch (error) {
            return next(error)
        }
    }

    async read ( request, response, next ) {
        try {
            const filter = {
                user_id: request.user._id
            }            
            const many = await readService(filter)
            if(!many){
                return response.error404()
            }
            else{
                return response.response200(many)
            }
        } catch (error) {
            return next(error)
        }
    }

    async update ( request, response, next ) {
        try {
            const { id } = request.params
            const data = request.body
            const one = await updateService(id, data)
            if(!one){
                return response.error404()
            }
            else{
                return response.message204('Cart updated!')
            }            
        } catch (error) {
            return next(error)
        }
    }
}

const cartsController = new CartsController()
export const { 
    create,
    destroyMany,
    destroy,
    readOne,
    read,
    update
} = cartsController