import CustomRouter from '../CustomRouter.js'

import homeRouter from './home.view.js'
import cartsRouter from './carts.view.js'
import chatRouter from './chat.view.js'
import loginRouter from './login.view.js'
import notesRouter from './notes.view.js'
import productsRouter from './products.view.js'
import registerRouter from './register.view.js'
import usersRouter from './users.view.js'

class ViewsRouter extends CustomRouter {

    init() {
        this.use('/', homeRouter)
        this.use('/carts/', cartsRouter)
        this.use('/chat', chatRouter)
        this.use('/login', loginRouter)
        this.use('/notes', notesRouter)
        this.use('/products', productsRouter)
        this.use('/register', registerRouter)
        this.use('/users', usersRouter)
    }
}

const viewsRouter = new ViewsRouter()
export default viewsRouter.getRouter()