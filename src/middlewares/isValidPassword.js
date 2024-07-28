async function isValidPassword (request, _response, next) {
    try {

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,8}$/;
        const { password } = request.body
        const passwordFormat = passwordRegex.test(password)

        if( !passwordFormat ) {
            const error = new Error('¡The password must be between 6 and 8 characters and at least one letter and one number!')
            error.statusCode = 400
            throw error
        }

        return next()
        
    } catch (error) {
        return next(error) 
    }
}

export default isValidPassword