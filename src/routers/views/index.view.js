import { Router } from  'express'
import cartsRouter from './carts.view.js'
import chatRouter from './chat.view.js'
import notesRouter from './notes.view.js'
import registerRouter from './register.view.js'
import productsRouter from './products.view.js'
import usersRouter from './users.view.js'
import productsManager from '../../data/mongo/managers/productsManager.js'

const viewsRouter = Router();

viewsRouter.use('/carts/', cartsRouter)
viewsRouter.use('/notes', notesRouter)
viewsRouter.use('/register', registerRouter)
viewsRouter.use('/products', productsRouter)
viewsRouter.use('/users', usersRouter)
viewsRouter.use('/chat', chatRouter)

viewsRouter.get('/', async (_request, response, next) => {
    try{
        const filter = {}
        const sortAndPaginate = {
            limit: 6
        }

        const result = await productsManager.paginate({filter, sortAndPaginate})
        let products = result.docs.map( product => product.toObject())
        let page = result.page
        let prevPage = result.prevPage
        let nextPage = result.nextPage
        
        return response.render('index', {title: 'CoderServer', products, page, prevPage, nextPage })
    }catch (error) {
        return next(error)
    }
})

export default viewsRouter;