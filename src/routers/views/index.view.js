import { Router } from 'express';
import usersRouter from './users.view.js';

const viewsRouter = Router();

viewsRouter.use('/users', usersRouter);
viewsRouter.get('/', (_request, response, _next) => {
    try{
        return response.render('index', {title: 'CompuMundoHiperMegaRed'})
    }catch (error) {
        return _next(error)
    }
})

export default viewsRouter;