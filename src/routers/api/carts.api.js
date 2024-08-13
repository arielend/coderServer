import CustomRouter from '../CustomRouter.js'
import { create, destroy, destroyMany, read, readOne, update } from '../../controllers/carts.controller.js'

class CartsRouter extends CustomRouter {
    init(){
        this.create('/', ['PUBLIC'], create)
        this.read('/', ['ADMIN', 'CUSTOMER'], read)
        this.destroy('/:id', ['ADMIN', 'CUSTOMER'], destroy)
        this.readOne('/:id', ['ADMIN', 'CUSTOMER'], readOne)
        this.update('/:id', ['ADMIN', 'CUSTOMER'], update)
        this.destroyMany('/clear', ['ADMIN', 'CUSTOMER'], destroyMany)
    }
}

const cartsRouter = new CartsRouter()
export default cartsRouter.getRouter()