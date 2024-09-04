import Winston from '../utils/winston.util.js'

function errorHandler (error, request, response, next) {

    if (response.headersSent) {
        console.log('El error: ', error)
        return next(error)
    }

    const message = `Verb: ${request.method} - URL: ${request.url} - Message: ${error.message} - Date: ${new Date().toLocaleString()}.`
    Winston.ERROR(message)

    return response.json({
        statusCode: error.statusCode || 500,
        succes: false,
        message: error.message || "API error",
    })

}

export default errorHandler