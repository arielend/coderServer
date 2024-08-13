function pathHandler ( request, response, next ) {
    return response.json({
        statusCode: 404,
        succes: false,
        message: `${request.method} ${request.url} - Api path not found!`
    })
}

export default pathHandler