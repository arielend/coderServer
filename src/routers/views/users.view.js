import { Router } from 'express'
import { usersManager } from '../../data/managers/managers.js'

const usersRouter = Router()

usersRouter.get('/', async (request, response, next) => {

    try {
        const users = await usersManager.read()
        return response.render('users', { users })        
    } catch (error) {
        next(error)
    }
})

usersRouter.get('/:id', async ( request, response, next ) => {

    try {
        const { id } = request.params
        const user = await usersManager.readOne(id)

        return response.render('userProfile', { user })
        
    } catch (error) {
        return next(error)
    }

})

export default usersRouter