import CustomRouter from '../CustomRouter.js'
import { pay, retrieve } from '../../controllers/payment.controller.js'

class PaymentRouter extends CustomRouter {
    init(){
        this.create('/', ['CUSTOMER', 'PREM'], pay)
        this.readOne('/:id', ['CUSTOMER', 'PREM', 'ADMIN'], retrieve)
    }
}

const paymentRouter = new PaymentRouter()
export default paymentRouter.getRouter()