import CustomRouter from '../CustomRouter.js'

import usersManager from '../../data/mongo/managers/usersManager.js'
import passport from '../../middlewares/passport.js'

class UsersRouter extends CustomRouter {

	init() {
		this.readOne('/:id', passport.authenticate('jwt', { session: false }), readOne)
		this.update('/:id', passport.authenticate('jwt', { session: false }), update)
	}
}

async function readOne(request, response, next) {
	try {

		const { _id } = request.user
		const foundUser = await usersManager.readOne(_id)

		if (foundUser) {
			return response.status200(foundUser)
		} else {
			return response.status404()
		}
	} catch (error) {
		return next(error)
	}
}

async function update(request, response, next) {
	try {
		const { _id } = request.user
		const data = request.body
		const updateUser = await usersManager.update(_id, data)
		if(updateUser){
			return response.status200(`User id ${_id} updated!`)
		} else {
			return response.status404()
		}
	} catch (error) {
		return next(error);
	}
}

const usersRouter = new UsersRouter()

export default usersRouter.getRouter()