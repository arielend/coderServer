import usersManager from '../data/mongo/managers/usersManager.js'

async function isValidPassword (request, response, next) {
    try {
        const { email, password } = request.body
        const registeredUser = await usersManager.readByEmail(email)

        if(registeredUser.password !== password) {
            const error = new Error('¡Invalid credentials!')
            error.statusCode = 401
            throw error
        }

        return next()
        
    } catch (error) {
        return next(error)
    }
}

export default isValidPassword