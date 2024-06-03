import CustomRouter from '../CustomRouter.js'
import passport from '../../middlewares/passport.js'
import passporCB from '../../middlewares/passportCB.js'
import isValidData from '../../middlewares/isValidData.js'

class SessionsRouter extends CustomRouter {

    init () {
        this.create('/login', ['PUBLIC'], isValidData, passporCB('login'), async (request, response, next) => {
            try {
        
                return response.cookie('token', request.user.token, {signed: true}).json({
                    statusCode: 200,
                    message: 'You are logged in!'
                })         
                
            } catch (error) {
                return next(error)
            }
        })

        this.create('/register', ['PUBLIC'], isValidData, passporCB('register'), async (request, response, next ) => {
        
            try {
                return response.json({
                    statusCode: 201,
                    message: '¡User registered!'
                }) 
                
            } catch (error) {
                return next(error)
            }
        })

        this.read('/online', ['ADMIN', 'CUSTOMER'], passporCB('jwt'), async (request, response, next) => {
            try {
                if (request.user.online) {
                    return response.json({
                        statusCode: 200,
                        message: "¡User Online!",
                        user_id: request.user._id
        
                    })
                } else {
                    return response.json({
                        statusCode: 401,
                        message: "¡Bath auth!"
                    })
                }
            } catch (error) {
                return next(error)
            }
        })

        this.create('/logout', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), async (request, response, next) => {
        
            try {
                if(request.user.online) {
                    return response.clearCookie('token').json({
                        statusCode: 200,
                        message: '¡Signing out!'
                    })
                } else {
                    return response.json({
                        statusCode: 401,
                        message: '¡Bad auth on logout!'
                    })
                }        
            } catch (error) {
                return next(error)
            }
        })

        this.read('/google', ['PUBLIC'], passport.authenticate('google', { scope: [ 'email', 'profile' ]}))

        this.read('/google/callback', ['PUBLIC'], passport.authenticate('google', {session: false, failureRedirect: '/login' }), 
            (request, response, next ) => {
            try {
        
                return response.json({
                    session: request.session,
                    statusCode: 200,
                    message: 'Logged in with Google!'
                })
        
            } catch (error) {
                return next(error)
            }
        })
    }
}

const sessionsRouter = new SessionsRouter()
export default sessionsRouter.getRouter()