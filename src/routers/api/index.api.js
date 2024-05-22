import { Router } from 'express'
import cartsRouter from './carts.api.js'
import productsRouter from './products.api.js'
import usersRouter from './users.api.js'
import ticketsRouter from './tickets.api.js'
import sessionsRouter from './sessions.api.js'

const apiRouter = Router()

apiRouter.use('/carts', cartsRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/tickets', ticketsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/tickets', ticketsRouter)
apiRouter.use('/sessions', sessionsRouter)

export default apiRouter