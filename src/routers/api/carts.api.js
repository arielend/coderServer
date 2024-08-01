import CustomRouter from '../CustomRouter.js'
import { paginate, create, update, destroy, destroyMany } from '../../controllers/carts.controller.js'

class CartsRouter extends CustomRouter {

    init() {
        this.paginate('/', ['ADMIN', 'CUSTOMER'], paginate)
        this.paginate('/:id', ['ADMIN', 'CUSTOMER'], paginate)
        this.create('/', ['ADMIN', 'CUSTOMER'], create)
        this.update('/:id', ['ADMIN', 'CUSTOMER'], update)
        this.destroy('/:id', ['ADMIN', 'CUSTOMER'], destroy)
        this.destroyMany('/', ['ADMIN', 'CUSTOMER'], destroyMany )
    }
}

const cartsRouter = new CartsRouter()
export default cartsRouter.getRouter()