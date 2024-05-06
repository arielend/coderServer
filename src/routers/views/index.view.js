import { Router } from  'express'
import chatRouter from './chat.view.js'
import notesRouter from './notes.view.js'
import registerRouter from './register.view.js'
import productsRouter from './products.view.js'
import usersRouter from './users.view.js'
import productsManager from '../../data/mongo/managers/productsManager.js'

const viewsRouter = Router();

viewsRouter.use('/notes', notesRouter)
viewsRouter.use('/register', registerRouter)
viewsRouter.use('/products', productsRouter)
viewsRouter.use('/users', usersRouter)
viewsRouter.use('/chat', chatRouter)

viewsRouter.get('/', async (_request, response, next) => {
    try{
        const products = await productsManager.read()
        return response.render('index', {title: 'CoderServer', products})
    }catch (error) {
        return next(error)
    }
})



export default viewsRouter;