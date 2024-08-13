async function IsValidLoginData ( request, response, next ) {
    try {
        const { email, password } = request.body
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
        
        if(!email || !password) {
            const error = new Error('Email and password fields are required (mid validation)!')
            error.statusCode = 400
            throw error
        }
        if(!emailRegex.test(email)){
            const error = new Error('Something is wrong with the email format (mid validation)!')
            error.statusCode = 400
            throw error
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export default IsValidLoginData