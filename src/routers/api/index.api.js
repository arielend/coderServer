import { Router } from 'express'
import productsRouter from './products.api.js'
import usersRouter from './users.api.js'
import ticketsRouter from './tickets.api.js'

const apiRouter = Router()

apiRouter.use('/products', productsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/tickets', ticketsRouter)

export default apiRouter