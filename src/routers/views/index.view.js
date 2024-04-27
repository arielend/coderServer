import { Router } from  'express'
import notesRouter from './notes.view.js'
import registerRouter from './register.view.js'
import productsRouter from './products.view.js'
import usersRouter from './users.view.js'

const viewsRouter = Router();

viewsRouter.use('/notes', notesRouter)
viewsRouter.use('/register', registerRouter)
viewsRouter.use('/products', productsRouter)
viewsRouter.use('/users', usersRouter)

viewsRouter.get('/', (_request, response, next) => {
    try{
        return response.render('index', {title: 'CompuMundoHiperMegaRed'})
    }catch (error) {
        return next(error)
    }
})

export default viewsRouter;