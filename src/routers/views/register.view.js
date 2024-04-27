import { Router } from 'express'

const registerRouter = Router()

registerRouter.get('/', async (request, response, next) => {

    try {
        return response.render('register')        
    } catch (error) {
        next(error)
    }

})

export default registerRouter