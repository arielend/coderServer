function isOnline (request, response, next) {
    try {
        if (request.session.online) {
            return next()
        } else {
            response.redirect('/')
        }
    } catch (error) {
        return next(error)
    }
}

export default isOnline