import CustomRouter from '../CustomRouter.js'
import {
    create,
    destroy,
    paginate,
    readOne,
    update,
    readLast
} from '../../controllers/products.controller.js'

class ProductsRouter extends CustomRouter {
    init(){
        this.create('/', ['ADMIN'], create)
        this.destroy('/:id', ['ADMIN'], destroy)
        this.paginate('/', ['PUBLIC'], paginate)
        this.readOne('/:id', ['PUBLIC'], readOne)
        this.update('/:id', ['ADMIN'], update)
        this.readLast('/', ['PUBLIC'], readLast)
    }
}

const productsRouter = new ProductsRouter()
export default productsRouter.getRouter()