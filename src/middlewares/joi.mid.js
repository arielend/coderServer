import CustomError from '../utils/errors/CustomError.js'

function validate (schema) {
    return(request, _response, next) => {
        const validation = schema.validate(request.body, { abortEarly: false})

        if (validation.error) {
            let message = validation.error.details.map(error=>error.message)
            CustomError.new({
                statusCode: 400,
                message
            })
        }
        return next()
    }
}

export default validate