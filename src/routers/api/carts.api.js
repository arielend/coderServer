import CustomRouter from '../CustomRouter.js'
import passport from '../../middlewares/passport.js'
import { paginate, create, update, destroy, destroyMany } from '../../controllers/carts.controller.js'

class CartsRouter extends CustomRouter {

    init() {
        this.paginate('/', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), paginate)
        this.paginate('/:id', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), paginate)
        this.create('/', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), create)
        this.update('/:id', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), update)
        this.destroy('/:id', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), destroy)
        this.destroyMany('/', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), destroyMany )
    }
}

const cartsRouter = new CartsRouter()
export default cartsRouter.getRouter()