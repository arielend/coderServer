import { Router } from 'express'

const usersRouter = Router()

usersRouter.get('/', async (request, response, next) => {

    try {
        return response.render('users')        
    } catch (error) {
        next(error)
    }

})

export default usersRouter