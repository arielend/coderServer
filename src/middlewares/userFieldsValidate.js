function userFieldsValidate (request, _response, next) {
    try {
        const { email, password, photo, rol } = request.body

        if(Object.keys(request.body).length ===0) {
            const error = new Error('Bad request: the create method requires a data object that has not been passed as a parameter.')
            error.statusCode = 400
            throw error
        }

        if(!email) {
            const error = new Error('Bad request: email field is required.')
            error.statusCode = 400
            throw error
        }

        if(!password) {
            const error = new Error('Bad request: password field is required.')
            error.statusCode = 400
            throw error
        }

        !rol && (request.body.rol = 'customer')        

        !photo && (request.body.photo = '/images/no_profile_photo.svg')

        return next()
        
    } catch (error) {
        return next(error)        
    }
}

export default userFieldsValidate