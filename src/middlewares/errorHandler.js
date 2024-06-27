function errorHandler (error, _request, response, next) {

    console.error('An error has ocurred: ', error)
    if (response.headersSent) {
        return next(error)
    }

    return response.json({
        statusCode: error.statusCode || 500,
        succes: false,
        message: error.message || "API error",
    })

}

export default errorHandler