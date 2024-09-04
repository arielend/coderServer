import CustomRouter from '../CustomRouter.js'
import {
    create,
    destroy,
    paginate,
    read,
    readOne,
    update,
    readLast
} from '../../controllers/products.controller.js'

class ProductsRouter extends CustomRouter {
    init(){
        this.read('/me', ['ADMIN', 'PREM'], read)
        this.readOne('/:id', ['PUBLIC'], readOne)
        this.destroy('/:id', ['ADMIN', 'PREM'], destroy)
        this.update('/:id', ['ADMIN', 'PREM'], update)
        this.create('/', ['ADMIN', 'PREM'], create)
        this.paginate('/', ['PUBLIC'], paginate)
    }
}

const productsRouter = new ProductsRouter()
export default productsRouter.getRouter()