import usersManager from '../data/mongo/managers/usersManager.js'

async function isValidEmail (request, _response, next) {
    try {

        const { email } = request.body
        const registeredEmail = await usersManager.readByEmail(email)

        if(registeredEmail) {
            const error = new Error('Bad auth on register!')
            error.statusCode = 401
            throw error
        }

        return next() 
        
    } catch (error) {
        return next(error)
    }
}

export default isValidEmail