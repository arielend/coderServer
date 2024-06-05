import { verifyToken } from '../utils/token.js'

function isOnline (request, _response, next) {
    try {

        const user = { online: false}
        
        if (request.signedCookies.token){
            const token = request.signedCookies.token
            const data = verifyToken(token)

            if(data){
                request.user = data                
                return next()
            }
            else{
                const error = new Error('Bad auth!')
                error.statusCode = 401
                throw error 
            }
        }
        else {
            request.user = user
            return next()
        }
    } catch (error) {
        return next(error)
    }
}

export default isOnline