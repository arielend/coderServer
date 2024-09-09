import CustomRouter from '../CustomRouter.js'

class CookiesRouter extends CustomRouter {
    init(){
        this.read('/getCookies', ['CUSTOMER', 'PREM', 'ADMIN'], getCookies)
    }

    getCookies (request, response, next) {
        try {
            const data1 = {
                property1: 1,
                property2: 2
            }

            const data2 = {
                property1: 3,
                property2: 4
            }

            const userData = request.user
            const token = request.user.token

            response.cookie('cookie1', data1, {
                signed: true,
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 60 * 60 * 1000 // 1 hora de vida
                }
            )

            response.cookie('cookie2', data2, {
                httpOnly: false,
                secure: true,
                sameSite: 'None',
                maxAge: 60 * 60 * 1000 // 1 hora de vida
            })            

            return response.message200('The cookies!')            
        } catch (error) {
            return next(error)
        }
    }
}

const cookiesRouter = new CookiesRouter()
export default cookiesRouter.getRouter()