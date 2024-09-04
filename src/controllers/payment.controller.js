import { createService, readOneService } from '../services/payment.service.js'

class PaymentController {

    async pay ( request, response, next ) {
        try {
            const user_id = request.user._id
            const payIntent = await createService(user_id)
            return response.response200(payIntent)
        } catch (error) {
            return next(error)
        }
    }
    
    async retrieve (request, response, next) {
        try {
            const session_id = request.params.id
            const payIntent = await readOneService(session_id)
            return response.response200(payIntent)
        } catch (error) {
            return next(error)
        }
    }
}

const paymentController = new PaymentController()
export const { 
    pay,
    retrieve
} = paymentController