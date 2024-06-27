import { readByEmailService, updateService } from '../services/users.service.js'

class SessionsController {

    async login (request, response, next ) {
        try {        
            return response.cookie('token', request.user.token, {signed: true, httpOnly: true, secure: false, sameSite: 'strict'}).json({
                statusCode: 200,
                message: 'You are logged in!'
            })         
            
        } catch (error) {
            return next(error)
        }
    }
    
    async register ( request, response, next ) {
        try {
            return response.json({
                statusCode: 201,
                message: '¡User registered!'
            }) 
            
        } catch (error) {
            return next(error)
        }    
    }

    async verify (request, response, next) {
        try {

            const { email, verifyCode } = request.body
            const one = await readByEmailService(email)

            if(!one) {
                return response.error404()
            }
            else{
                const { _id } = one
                const verified = (verifyCode === one.verifyCode)

                if(verified) {
                    await updateService({
                        id: _id,
                        data: {verified}
                    })

                    return response.message200('User verified!')                     
                }
            }
        } catch (error) {
            return next(error)
        }
    }
    
    async online ( request, response, next ) {
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
    }
    
    logout (request, response, next ) {
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
    }

    google (request, response, next) {
        try {        
            return response.json({
                session: request.session,
                statusCode: 200,
                message: 'Logged in with Google!'
            })        
        } catch (error) {
            return next(error)
        }
    }
}

const sessionsController = new SessionsController()
export const { login, register, verify, online, logout, google } = sessionsController