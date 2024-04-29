import { Router } from 'express'
import usersManager from '../../data/mongo/managers/usersManager.js'

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
        console.log(user);
        return response.render('userProfile', { user })
        
    } catch (error) {
        return next(error)
    }

})

export default usersRouter