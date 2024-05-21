import usersManager from '../data/mongo/managers/usersManager.js'
import { verifyHash } from '../utils/hash.js'

async function isValidPassword (request, response, next) {
    try {
        const { email, password } = request.body
        const registeredUser = await usersManager.readByEmail(email)
        const verify = verifyHash(password, registeredUser.password)

        if(verify) {
            return next()
        }

        const error = new Error('¡Invalid credentials!')
        error.statusCode = 401
        throw error        
    } catch (error) {
        return next(error)
    }
}

export default isValidPassword