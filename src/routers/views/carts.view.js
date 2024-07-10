import CustomRouter from '../CustomRouter.js'

import cartsManager from '../../DAO/mongo/managers/cartsManager.js'
import passport from '../../middlewares/passport.js'

class CartsRouter extends CustomRouter {

    init(){
        this.read('/', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), read)
    }
}

const cartsRouter = new CartsRouter()
export default cartsRouter.getRouter()

async function read (request, response, next ){
    try {
    
        if (response.statusCode == 403) {
            return response.redirect('/')
        }
    
        const user = request.user
        const { _id } = request.user
        
        const result = await cartsManager.paginate({_id})
        const userCarts = result.docs.map( cart => cart.toObject())        
        
        return response.render('carts', {title: "CoderServer | Carts", user, userCarts})
    } catch (error) {
        next(error)
    }
}