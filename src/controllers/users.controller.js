import { 
    readOneService,
    updateService
} from '../services/users.service.js'

class UsersController {

    async readOne ( request, response, next ) {
        try {
            const _id = request.params.id
            let one = await readOneService(_id)
            if(one){
                one = one.toObject()
                one.password && delete one.password
                one.verifyCode && delete one.verifyCode
                one.createdAt && delete one.createdAt
                one.updatedAt && delete one.updatedAt
                
                return response.response200(one)
            }
            else{
                return response.error404()
            }            
        } catch (error) {
            return next(error)
        }
    }

    async update ( request, response, next ) {
        try {
            const { id } = request.params
            const data = request.body
            const one = updateService(id, data)
            if(one){
                return response.message204('User updated!')
            }
            else{
                return response.error404()
            }            
        } catch (error) {
            return next(error)
        }
    }
}

const usersController = new UsersController()
export const { 
    readOne,
    update
} = usersController