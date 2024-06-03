import CustomRouter from '../CustomRouter.js'

import cartsManager from '../../data/mongo/managers/cartsManager.js'
import isAuthenticated from '../../middlewares/isAuthenticated.js'

class CartsRouter extends CustomRouter {

    init(){
        this.read('/', ['ADMIN', 'CUSTOMER'], isAuthenticated, read)
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