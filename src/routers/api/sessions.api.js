import { Router } from "express";
import usersManager from "../../data/mongo/managers/usersManager.js";
import isValidEmail from "../../middlewares/isValidEmail.js";
import isValidData from "../../middlewares/isValidData.js";
import isValidUser from "../../middlewares/isValidUser.js";
import isValidPassword from "../../middlewares/isValidPassword.js";
import createHashPassword from "../../middlewares/createHashPassword.js";
import passport from "../../middlewares/passport.js";
import { session } from "passport";

const sessionsRouter = Router();

sessionsRouter.post(
    '/register', 
    //isValidData, 
    //isValidEmail, 
    //createHashPassword, 
    passport.authenticate('register', {session: false}),
    async (req, res, next)=>{
    try {
        const data = req.body
        const one = await usersManager.create(data)
        return json({statusCode: 201, message: 'Registered'})


sessionsRouter.post(
    '/login', 
    //isValidUser, 
    //isValidPassword, 
    passport.authenticate('login', {session: false}),
    async (req, res, next) =>{
    try {
            return res.json({statusCode: 200, message: 'Logged in', token: req.user.token});
        } catch (error) {
            return next(error)
    }
});
sessionsRouter.get('/online', async(req, res, next) =>{
    try {
        if (req.session.online) {
            return res.json({
                statusCode: 200,
                message: 'Is online'
            })
        }
        return res.json({
            statusCode: 401,
            message: 'Bad auth'
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


sessionsRouter.post('signout', async (req, res, next) =>{
    try {
        if (req.session.email){
            req.session.destroy()
            return res.json({statusCode: 200, message: 'Signed out'})
        }
        const error = new Error('Invalid credentials')
        error.statusCode = 403
        throw error

    } catch (error) {
        return next(error)
    }
})

export default sessionsRouter;

