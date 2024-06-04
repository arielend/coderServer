import CustomRouter from '../CustomRouter.js'

import productsManager from '../../data/mongo/managers/productsManager.js'
import passport from '../../middlewares/passport.js'

class HomeRouter extends CustomRouter {

    init() {
        this.read('/', ['PUBLIC'], passport.authenticate('jwt', { session: false }), read)
    }
}

async function read (request, response, next) {
    
    const user = request.user
    
    try {
        
        const filter = {}
        const sortAndPaginate = { limit: 6 }
        
        const result = await productsManager.paginate({filter, sortAndPaginate})
        let products = result.docs.map( product => product.toObject())
        
        const pagination = {
            page: result.page,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            totalPages: result.totalPages
        }            
        return response.render('index', {layout: 'main', title: 'CoderServer | Home ', products, pagination, user})
        
    } catch (error) {
        next(error)
    }
}

const homeRouter = new HomeRouter()
export default homeRouter.getRouter()