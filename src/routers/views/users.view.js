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

usersRouter.get('/register', async (request, response, next) => {

    try {
        const users = await usersManager.read()
        return response.render('register', { users })        
    } catch (error) {
        next(error)
    }
})

usersRouter.get('/real', async (request, response, next) => {
    try {
        return response.render('userProfile')
    } catch (error) {
        return next(error)
        
    }
})

usersRouter.get('/:id', async (request, response, next) => {
    try {        
        return response.render('userProfile', {layout: 'main', user: request.session})        
    } catch (error) {
        return next(error)
    }
})

export default usersRouter