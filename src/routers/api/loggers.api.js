import { Router } from 'express'
import logger from '../../utils/winston.util.js'

const loggerRouter = Router()

loggerRouter.get('/http', httpLogger)
loggerRouter.get('/info', infoLogger)
loggerRouter.get('/error', errorLogger)
loggerRouter.get('/fatal', fatalLogger)

function httpLogger (request, response, next) {
    try {
        const message = `Logger test => Verb: ${request.method} - URL: ${request.url} - Date: ${new Date().toLocaleString()}.`
        logger.HTTP(message)
        return response.message200(message)
    } catch (error) {
        return next(error)
    }
}

function infoLogger (request, response, next) {
    try {
        const message = `Logger test => Verb: ${request.method} - URL: ${request.url} - Date: ${new Date().toLocaleString()}.`
        logger.INFO(message)
        return response.message200(message)
    } catch (error) {
        return next(error)
    }
}

function errorLogger (request, response, next) {
    try {
        const error = new Error('Default error Test!')
        error.statusCode = 500
        const message = `Logger test => Verb: ${request.method} - URL: ${request.url} - Message: ${error.statusCode}: ${error.message} - Date: ${new Date().toLocaleString()}.`
        logger.ERROR(message)
        return response.errorLog(message)
    } catch (error) {
        return next(error)
    }
}

function fatalLogger (request, response, next) {
    try {
        const error = new Error('Fatal error Test!')
        error.statusCode = 500
        const message = `Logger test => Verb: ${request.method} - URL: ${request.url} - Message: ${error.statusCode}: ${error.message} - Date: ${new Date().toLocaleString()}.`
        logger.FATAL(message)
        return response.errorLog(message)
    } catch (error) {
        return next(error)
    }
}

export default loggerRouter