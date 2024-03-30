function pathHandler (request, response, _next) {

    return response.json({
        statusCode: 404,
        succes: false,
        message: `${request.method} ${request.url} not found path.`
    })

}

export default pathHandler