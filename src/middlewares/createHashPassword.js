import { createHash } from '../utils/hash.js'

function createHashPassword ( request, response, next ) {
    try {
        const { password } = request.body
        const hashPassword = createHash(password)
        request.body.password = hashPassword
        return next()        
    } catch (error) {
        return next(error)        
    }
}

export default createHashPassword