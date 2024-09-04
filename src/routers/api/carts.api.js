import CustomRouter from '../CustomRouter.js'
import { create, destroy, destroyMany, read, readOne, update } from '../../controllers/carts.controller.js'
import CheckBuyingRestrictions from '../../middlewares/checkBuyingRestrictions.mid.js'

class CartsRouter extends CustomRouter {
    init(){
        this.create('/', ['CUSTOMER', 'PREM', 'ADMIN'], CheckBuyingRestrictions, create)
        this.read('/', ['ADMIN', 'CUSTOMER', 'PREM'], read)
        this.destroyMany('/clear', ['CUSTOMER', 'PREM'], destroyMany)
        this.destroy('/:id', ['CUSTOMER', 'PREM'], destroy)
        this.readOne('/:id', ['ADMIN', 'CUSTOMER', 'PREM'], readOne)
        this.update('/:id', ['CUSTOMER', 'PREM'], update)
    }
}

const cartsRouter = new CartsRouter()
export default cartsRouter.getRouter()