import CustomRouter from '../CustomRouter.js'
import { readOne, paginate } from '../../controllers/products.controller.js'
import isOnline from '../../middlewares/isOnline.js'


class ProductsRouter extends CustomRouter {

    init() {
        this.paginate('/', ['PUBLIC'], isOnline, paginate)
        this.readOne('/:id', ['PUBLIC'], isOnline, readOne)
    }
}

const productsRouter = new ProductsRouter()
export default productsRouter.getRouter()