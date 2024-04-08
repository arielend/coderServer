import { Router } from 'express'

const loginRouter = Router()

loginRouter.get('/', async (request, response, next) => {

    try {
        return response.render('login')        
    } catch (error) {
        next(error)
    }

})

export default loginRouter