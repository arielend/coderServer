async function isValidPassword (request, _response, next) {
    try {

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
        const { password } = request.body
        const passwordFormat = passwordRegex.test(password)

        if( !passwordFormat ) {
            const error = new Error('¡The password must be between 6 and 12 characters and at least one lowercase character, one uppercase character, and one numeric character!')
            error.statusCode = 400
            throw error
        }

        return next()
        
    } catch (error) {
        return next(error) 
    }
}

export default isValidPassword