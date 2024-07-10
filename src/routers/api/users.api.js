import CustomRouter from '../CustomRouter.js'
import { readOne, update } from '../../controllers/users.controller.js'
import passport from '../../middlewares/passport.js'

class UsersRouter extends CustomRouter {

	init() {
		this.readOne('/:id', passport.authenticate('jwt', { session: false }), readOne)
		this.update('/:id', passport.authenticate('jwt', { session: false }), update)
	}
}

const usersRouter = new UsersRouter()
export default usersRouter.getRouter()