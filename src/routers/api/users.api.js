import CustomRouter from '../CustomRouter.js'
import { readOne, update } from '../../controllers/users.controller.js'

class UsersRouter extends CustomRouter {
    init(){
        this.readOne('/:id', ['ADMIN', 'CUSTOMER'], readOne)
        this.update('/:id', ['ADMIN', 'CUSTOMER'], update)
    }
}

const usersRouter = new UsersRouter()
export default usersRouter.getRouter()