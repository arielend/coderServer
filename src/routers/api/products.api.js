import CustomRouter from '../CustomRouter.js'
import { paginate, readOne, create, update, destroy } from '../../controllers/products.controller.js'

import uploader from '../../middlewares/multer.js'
import isPhoto from '../../middlewares/isPhoto.js'
import productFieldsValidate from '../../middlewares/productFieldsValidate.js'
import isOnline from '../../middlewares/isOnline.js'
import passport from '../../middlewares/passport.js'

class ProductsRouter extends CustomRouter {

    init() {
        //this.read('/', ['PUBLIC'], read)
        this.paginate('/', ['PUBLIC'], isOnline, paginate)
        this.readOne('/:id', ['PUBLIC'], isOnline, readOne)
        this.create('/', ['ADMIN'], passport.authenticate('jwt', { session: false }), uploader.single('photo'), isPhoto, productFieldsValidate, create)
        this.update('/:id', ['ADMIN'], passport.authenticate('jwt', { session: false }), update)
        this.destroy('/:id', ['ADMIN'], passport.authenticate('jwt', { session: false }), destroy)
    }
}

const productsRouter = new ProductsRouter()

export default productsRouter.getRouter()