import CustomRouter from '../CustomRouter.js'
import passport from '../../middlewares/passport.js'
import passporCB from '../../middlewares/passportCB.js'
import isValidData from '../../middlewares/isValidData.js'

import { login, register, online, logout, google, verify } from '../../controllers/sessions.controller.js'

class SessionsRouter extends CustomRouter {

    init () {
        this.create('/login', ['PUBLIC'], isValidData, passporCB('login'), login)

        this.create('/register', ['PUBLIC'], isValidData, passporCB('register'), register)

        this.read('/online', ['ADMIN', 'CUSTOMER'], passporCB('jwt'), online)

        this.create('/logout', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), logout)

        this.read('/google', ['PUBLIC'], passport.authenticate('google', { scope: [ 'email', 'profile' ]}))

        this.read('/google/callback', ['PUBLIC'], passport.authenticate('google', {session: false, failureRedirect: '/login' }), google)

        this.create('/verify', ['PUBLIC'], verify)
    }
}

const sessionsRouter = new SessionsRouter()
export default sessionsRouter.getRouter()