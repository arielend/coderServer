import CustomRouter from '../CustomRouter.js'
import { paginate, readOne, create, update, destroy } from '../../controllers/products.controller.js'

import uploader from '../../middlewares/multer.js'
import isPhoto from '../../middlewares/isPhoto.js'
import productFieldsValidate from '../../middlewares/productFieldsValidate.js'

class ProductsRouter extends CustomRouter {

    init() {
        this.paginate('/', ['PUBLIC'], paginate)
        this.readOne('/:id', ['PUBLIC'], readOne)
        this.create('/', ['ADMIN'], uploader.single('photo'), isPhoto, productFieldsValidate, create)
        this.update('/:id', ['ADMIN'], update)
        this.destroy('/:id', ['ADMIN'], destroy)
    }
}

const productsRouter = new ProductsRouter()
export default productsRouter.getRouter()