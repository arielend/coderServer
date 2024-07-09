import logger from '../utils/winston.util.js'

function Winston (request, response, next) {

    const message = `${request.method} - URL: ${request.url} - Date: ${new Date().toLocaleString()}.`
    request.logger = logger
    request.logger.HTTP(message)
    return next()

}

export default Winston