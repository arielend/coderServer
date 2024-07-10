import { readOneService, updateService } from '../services/users.service.js'

class UsersController {

	async readOne(request, response, next) {
		try {
			const { _id } = request.user
			const foundUser = await readOneService(_id)

			if (foundUser) {
				return response.response200(foundUser)
			} else {
				return response.error404()
			}
		} catch (error) {
			return next(error)
		}
	}

	async update(request, response, next) {
		try {
			const { _id } = request.user
			const data = request.body
			const updateUser = await updateService(_id, data)
			if(updateUser){
				return response.response200(updateUser)
			} else {
				return response.error404()
			}
		} catch (error) {
			return next(error);
		}
	}
}

const usersController = new UsersController()
export const { readOne, update } = usersController