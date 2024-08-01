import CustomRouter from '../CustomRouter.js'
import passport from '../../middlewares/passport.js'
import passporCB from '../../middlewares/passportCB.js'
import isValidData from '../../middlewares/isValidData.js'
import isValidPassword from '../../middlewares/isValidPassword.js'

import validate from '../../middlewares/joi.js'
import validUsersSchema from '../../schema/users.schema.js' 

import { login, register, online, google, signout, verify, resetPassword, savePassword } from '../../controllers/sessions.controller.js'

class SessionsRouter extends CustomRouter {

    init () {

        this.create('/password', ['PUBLIC'], resetPassword)

        this.update('/password', ['PUBLIC'], isValidPassword, savePassword)

        this.create('/login', ['PUBLIC'], isValidData, passporCB('login'), login)

        this.create('/register', ['PUBLIC'], validate(validUsersSchema), passporCB('register'), register)

        this.read('/online', ['ADMIN', 'CUSTOMER'], passporCB('jwt'), online)

        this.create('/signout', ['ADMIN', 'CUSTOMER'], signout)
        
        this.read('/google', ['PUBLIC'], passport.authenticate('google', { scope: [ 'email', 'profile' ]}))

        this.read('/google/callback', ['PUBLIC'], passport.authenticate('google', {session: false, failureRedirect: '/login' }), google)

        this.create('/verify', ['PUBLIC'], verify)
    }
}

const sessionsRouter = new SessionsRouter()
export default sessionsRouter.getRouter()