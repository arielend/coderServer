import passport from 'passport'

function passportCB ( strategy ) {
    return (request, response, next ) => {
        passport.authenticate( strategy, (error, user, info) => {

            if(error) return next(error)

            if(user) {
                request.user = user
                return next()
            }

            return response.json({
                statusCode: info.statusCode || 401,
                message: info.messages ? info.messages : info.toString()
            })
        })(request, response, next)
    }
}

export default passportCB