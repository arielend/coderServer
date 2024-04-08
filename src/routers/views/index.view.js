
import { Router } from  'express'
import notesRouter from './notes.view.js'
import loginRouter from './login.view.js'
import productsRouter from './products.view.js'
import usersRouter from './users.view.js'


const viewsRouter = Router()

viewsRouter.use('/notes', notesRouter)
viewsRouter.use('/login', loginRouter)
viewsRouter.use('/products', productsRouter)
viewsRouter.use('/users', usersRouter)

viewsRouter.get('/', renderHome)

async function renderHome (request, response, next) {
    try {

        return response.render('index', {title: 'Coder Server'})
        
    } catch (error) {
        next(error)        
    }
}

export default viewsRouter