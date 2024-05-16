import { Router } from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import usersManager from '../../data/mongo/managers/usersManager.js'

import isValidData from '../../middlewares/isValidData.js'
import isAnEmail from '../../middlewares/isAnEmail.js'
import isValidEmail from '../../middlewares/isValidEmail.js'
import isValidUser from '../../middlewares/isValidUser.js'
import isValidPassword from '../../middlewares/isValidPassword.js'
import isAdmin from '../../middlewares/isAdmin.js'

const sessionsRouter = Router()

sessionsRouter.post('/login', isValidData, isValidUser, isValidPassword, async (request, response, next) => {
    try {

        const { email, password } = request.body
        const user = await usersManager.readByEmail(email)

        console.log('El user que viene al login: ', user);
        
        if(user?.password === password){
            request.session.email = email
            request.session.photo = user.photo
            request.session.role = user.role
            request.session.user_id = user._id
            request.session.online = true
            return response.json({
                statusCode: 200,
                message: 'You are logged in!'
            }) 
        } 
        else
        {
            return response.json({
                statusCode: 401,
                message: 'Bad auth on login!'
            })
        }
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.post('/register', isValidData, isAnEmail, isValidEmail, async (request, response, next ) => {
    try {
        const data = request.body
        const newUser = await usersManager.create(data)

        if(newUser) {
            return response.json({
                statusCode: 201,
                message: '¡New user registered'
            })
        }
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.get('/isOnline', async (request, response, next) => {
    try {
        if (request.session.online) {
            return response.json({
                statusCode: 200,
                message: "¡User Online!",
                user_id: request.session.user_id

            })
        } else {
            return response.json({
                statusCode: 401,
                message: "¡Bath auth!"
            })
        }
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.post('/logout', async (request, response, next) => {

    try {
        if(request.session) {
            request.session.destroy()
            return response.json({
                statusCode: 200,
                message: '¡Signing out!'
            })
        } else {
            return response.json({
                statusCode: 401,
                message: '¡Bad auth on logout!'
            })
        }        
    } catch (error) {
        return next(error)
    }
})

export default sessionsRouter