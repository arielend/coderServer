function isOnline (request, response, next) {
    try {
        const user = {}
        user.online = false

        if (request.signedCookies.user){

            
            return next()
        }
        else {
            const error = new Error ('Bad auth!')
            error.statusCode = 401
            throw error
        }
    } catch (error) {
        return next(error)
    }
}

export default isOnline