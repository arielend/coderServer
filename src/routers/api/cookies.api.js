import CustomRouter from '../CustomRouter.js'
import { getCookies } from '../../controllers/cookies.controller.js'

class CookiesRouter extends CustomRouter {
    init(){
        this.read('/getCookies', ['PUBLIC'], getCookies)
    }
}

const cookiesRouter = new CookiesRouter()
export default cookiesRouter.getRouter()