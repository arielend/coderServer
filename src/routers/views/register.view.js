import CustomRouter from '../CustomRouter.js'

class RegisterRouter extends CustomRouter {

    init() {
        this.read('/', ['PUBLIC'], read)

    }
}

async function read (request, response, next) {
    
    try {
        return response.render('register', {layout: 'loginLayout', title: 'CoderServer | Register'})        
    } catch (error) {
        next(error)
    }    
}

const registerRouter = new RegisterRouter()
export default registerRouter.getRouter()