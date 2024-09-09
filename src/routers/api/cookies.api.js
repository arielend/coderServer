import CustomRouter from '../CustomRouter.js'

import { getCookies } from '../../controllers/cookies.controller.js'


class CookiesRouter extends CustomRouter {
    init(){
        this.read('/getCookies', ['CUSTOMER', 'PREM', 'ADMIN'], getCookies)
    }
}

const cookiesRouter = new CookiesRouter()
export default cookiesRouter.getRouter()