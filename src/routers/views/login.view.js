import CustomRouter from '../CustomRouter.js'

class LoginRouter extends CustomRouter {

    init(){
        this.read('/', ['PUBLIC'], read)
    }
} 


async function read (_request, response, next) {    
    try {
        return response.render('login', {layout: 'loginLayout', title: 'CoderServer | Login'})        
    } catch (error) {
        next(error)
    }    
}

const loginRouter = new LoginRouter()
export default loginRouter.getRouter()