import CustomRouter from '../CustomRouter.js'
import usersManager from '../../DAO/mongo/managers/usersManager.js'
import passport from '../../middlewares/passport.js'

class UsersRouter extends CustomRouter {

    init() {
        this.read('/', ['CUSTOMER', 'ADMIN'], passport.authenticate('jwt', { session: false }), read)        
    }
}

async function read (request, response, next) {
    try {
        if (response.statusCode == 403) {
            return response.redirect('/')
        }    
        return response.render('userProfile', {title: "CoderServer | My account", layout: 'main', user: request.user})        
    } catch (error) {
        return next(error)
    }
}

const usersRouter = new UsersRouter()
export default usersRouter.getRouter()