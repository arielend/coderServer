import { Router } from "express";
import usersManager from "../../data/mongo/managers/usersManager";
import isValidEmail from "../../middlewares/isValidEmail";
import isValidData from "../../middlewares/isValidData";
import isValidUser from "../../middlewares/isValidUser";
import isValidPassword from "../../middlewares/isValidPassword";

const sessionsRouter = Router();

sessionsRouter.post('/register', isValidData, isValidEmail, async (req, res, next)=>{
    try {
        const data = req.body
        const one = await usersManager.create(data)
        return json({statusCode: 201, message: 'Registered'})
    } catch (error) {
        return next(error)
    }
})

sessionsRouter.post('/login', isValidUser, isValidPassword, async (req, res, next) =>{
    try {
        const {email} = req.body;
        const one = await usersManager.readByEmail(email);
            req.session.email = email;
            req.session.online = true;
            req.session.rol = one.rol;
            return res.json({statusCode: 200, message: 'Logged in'});
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
    } catch (error) {
        return next(error)
    }
})

export default sessionsRouter;