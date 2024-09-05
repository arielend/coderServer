import CustomRouter from '../CustomRouter.js'
import { readOne, update } from '../../controllers/users.controller.js'

class UsersRouter extends CustomRouter {
    init(){
        this.readOne('/:id', ['ADMIN', 'CUSTOMER', 'PREM'], readOne)
        this.readOne('/inSession', ['ADMIN', 'CUSTOMER', 'PREM'], readOne)
        this.update('/', ['ADMIN', 'CUSTOMER', 'PREM'], update)
    }
}

const usersRouter = new UsersRouter()
export default usersRouter.getRouter()