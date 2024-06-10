import { readOneService, updateService } from '../services/users.service.js'

class UsersController {

	async readOne(request, response, next) {
		try {
			const { _id } = request.user
			const foundUser = await readOneService(_id)

			if (foundUser) {
				return response.status200(foundUser)
			} else {
				return response.status404()
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
				return response.status200(`User id ${_id} updated!`)
			} else {
				return response.status404()
			}
		} catch (error) {
			return next(error);
		}
	}
}

const usersController = new UsersController()
export const { readOne, update } = usersController