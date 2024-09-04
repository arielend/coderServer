import CustomRouter from '../CustomRouter.js'

import cartsApi from './carts.api.js'
import loggersApi from './loggers.api.js'
import paymentApi from './payment.api.js'
import ordersApi from './orders.api.js'
import productsApi from './products.api.js'
import sessionsApi from './sessions.api.js'
import testsApi from './tests.api.js'
import ticketsApi from './tickets.api.js'
import usersApi from './users.api.js'

class ApiRouter extends CustomRouter {
    init() {
        this.use('/carts', cartsApi)
        this.use('/clearCarts/', cartsApi)
        this.use('/logger', loggersApi)
        this.use('/orders', ordersApi)
        this.use('/payment', paymentApi)
        this.use('/products', productsApi)
        this.use('/sessions', sessionsApi)
        this.use('/test', testsApi)
        this.use('/tickets', ticketsApi)
        this.use('/users', usersApi)
    }
}

const apiRouter = new ApiRouter()
export default apiRouter.getRouter()