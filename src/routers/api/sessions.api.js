import CustomRouter from '../CustomRouter.js'
import passport from '../../middlewares/passport.js'
import passportCB from '../../middlewares/passportCB.js'
import isValidPassword from '../../middlewares/isValidPassword.mid.js'

import validate from '../../middlewares/joi.mid.js'
import isValidLoginData from '../../middlewares/isValidLoginData.mid.js'
import validUserSchema from '../../schema/user.schema.js'

import { resetPassword, setPassword, signout, verify, register, login, destroy } from '../../controllers/sessions.controller.js'

class SessionsRouter extends CustomRouter {
    init(){

        //Rutas que utilizan passport
        this.create('/login', ['PUBLIC'], isValidLoginData, passportCB('login'), login)
        this.create('/register', ['PUBLIC'], validate(validUserSchema), passportCB('register'), register)
        this.read('/online', ['ADMIN', 'CUSTOMER'], passportCB('jwt'))
        this.read('/google', ['PUBLIC'], passport.authenticate('google', { scope: [ 'email', 'profile' ]}))
        this.read('/google/callback', ['PUBLIC'], passport.authenticate('google', {session: false, failureRedirect: '/login' }))

        //Rutas manejadas con el controlador de Sessions
        this.create('/password', ['PUBLIC'], resetPassword)
        this.update('/password', ['PUBLIC'], isValidPassword, setPassword)
        this.create('/signout', ['ADMIN', 'PUBLIC'], signout)
        this.create('/verify', ['PUBLIC'], verify)

        //Creado para el test - Solo un admin o usuario logueado debería poder eliminar su cuenta
        this.destroy('/:id', ['ADMIN', 'CUSTOMER'], destroy)
    }
}

const sessionsRouter = new SessionsRouter()
export default sessionsRouter.getRouter()