import {
    createService, 
    readOneService,
    readService,
    updateService
} from '../services/orders.service.js'

class OrdersController {

    async create ( request, response, next ) {
        try {
            const data = request.body
            data.user_id = request.user._id
            const one = await createService(data)
            if(!one){
                return response.error404()
            }
            else{
                return response.message201(`Order saved. ID: ${one._id}.`)
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
                return response.message204('Order updated!')
            }            
        } catch (error) {
            return next(error)
        }
    }
}

const ordersController = new OrdersController()
export const {
    create, 
    readOne,
    read,
    update
} = ordersController