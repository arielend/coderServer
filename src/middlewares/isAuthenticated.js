import { verifyToken } from '../utils/token.js'

function isAuthenticated (request, response, next) {
    try {

        const user = { online: false }

        if (request.signedCookies.token){
            const token = request.signedCookies.token
            const data = verifyToken(token)

            if(data){
                request.user = data                
                return next()
            }
            else{
                const error = new Error('Forbidden!')
                error.statusCode = 403
                throw error 
            }
        }

        response.statusCode = 403
        request.user = user
        return next()
        
    } catch (error) {
        return next(error)
    }
}

export default isAuthenticated