import { Router } from 'express'
import apiRouter from './api/index.api.js'
//import viewsRouter from './views/index.view.js'

const indexRouter = Router()

indexRouter.get('/', homePage)

indexRouter.use('/api', apiRouter)
//indexRouter.use('/', viewsRouter)

async function homePage (_request, response, _next) {

    try {

        return response.json({
            statusCode: 200,
            succes: true,
            response: 'Home Page Ok'
        })

    } catch (error) {
        console.log(`An error has ocurred: ${error}`)
        return response.json({
            statusCode: error.statusCode || 'Error 500',
            succes: false,
            message: error.message || `An error has ocurred: ${error}`
        })
    }
}

export default indexRouter