import usersManager from "../data/mongo/managers/usersManager";

async function isValidUser(req, res, next) {
    try {
        const {email} = req.body
        const one = await usersManager.readByEmail(email)
        if(!one) {
            const error = new Error('Bad auth')
            error.statusCode = 401
            throw error
        }
        return next()
    } catch (error) {
        next(error)
    }
}

export default isValidUser