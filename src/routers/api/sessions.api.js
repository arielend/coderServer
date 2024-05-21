import { Router } from 'express'
//import session from 'express-session'
//import cookieParser from 'cookie-parser'
import usersManager from '../../data/mongo/managers/usersManager.js'
import passport from '../../middlewares/passport.js'

import isValidData from '../../middlewares/isValidData.js'
//import isAnEmail from '../../middlewares/isAnEmail.js'
//import isValidEmail from '../../middlewares/isValidEmail.js'
import isValidUser from '../../middlewares/isValidUser.js'
import isValidPassword from '../../middlewares/isValidPassword.js'
//import checkPasswordConditions from '../../middlewares/checkPasswordConditions.js'
//import isAdmin from '../../middlewares/isAdmin.js'

//import createHashPassword from '../../middlewares/createHashPassword.js'
//import readHashPassword from '../../middlewares/readHashPassword.js'  

import isOnline from '../../middlewares/isOnline.js'

const sessionsRouter = Router()

sessionsRouter.post('/login', isValidData, passport.authenticate('login', { session: false }), async (request, response, next) => {
    try {

        // const { email } = request.body
        // const user = await usersManager.readByEmail(email)

        console.log('request session on login', request.session);

        return response.json({
            statusCode: 200,
            //token: request.user.token, descomentar esta linea con token
            message: 'You are logged in!'
        })         
        
    } catch (error) {
        return next(error)
    }
})

//Sigo usando isValidData porque passport no se esta ejecutando si los campos email o password estan vacios
sessionsRouter.post('/register', isValidData, passport.authenticate('register', { session: false }), async (request, response, next ) => {

    try {
        return response.json({
            statusCode: 201,
            message: '¡User registered!'
        }) 
        
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.get('/isOnline', isOnline, async (request, response, next) => {
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
        if(request.session.online) {
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

sessionsRouter.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ]}))

sessionsRouter.get('/google/callback', passport.authenticate('google', {session: false}), (request, accessToken, refreshToken, profile, done ) => {
    try {
        return response.json({
            statusCode: 200,
            message: 'Logged in with Google!'
        })
    } catch (error) {
        return next(error)
    }
})

export default sessionsRouter