import CustomRouter from '../CustomRouter.js'
import { create, read, readOne, update } from '../../controllers/orders.controller.js'

class OrdersRouter extends CustomRouter {
    init(){
        this.create('/', ['CUSTOMER', 'PREM'], create)
        this.read('/', ['ADMIN', 'CUSTOMER', 'PREM'], read)
        this.readOne('/:id', ['ADMIN', 'CUSTOMER', 'PREM'], readOne)
        this.update('/:id', ['ADMIN'], update)
    }
}

const ordersRouter = new OrdersRouter()
export default ordersRouter.getRouter()