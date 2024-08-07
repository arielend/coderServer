import CustomRouter from '../CustomRouter.js'

import cartsRouter from './carts.api.js'
import productsRouter from './products.api.js'
import usersRouter from './users.api.js'
import ticketsRouter from './tickets.api.js'
import sessionsRouter from './sessions.api.js'
import testRouter from './test.api.js'
import loggerRouter from './loggers.api.js'

class ApiRouter extends CustomRouter {

    init() {
        this.use('/carts', cartsRouter)
        this.use('/products', productsRouter)
        this.use('/users', usersRouter)
        this.use('/tickets', ticketsRouter)
        this.use('/sessions', sessionsRouter)
        this.use('/test', testRouter)
        this.use('/logger', loggerRouter)
    }
}

const apiRouter = new ApiRouter()

export default apiRouter.getRouter()