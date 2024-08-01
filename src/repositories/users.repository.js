import dao from '../DAO/dao.factory.js'
import UsersDTO from '../DTO/users.dto.js'
const { usersManager } = dao

class UsersRepository {

    constructor() {
        this.manager = usersManager
    }

    create = async (data) => {
        try {
            data = new UsersDTO(data)
            const one = await this.manager.create(data)
            return one            
        } catch (error) {
            throw error
        }
    }

    read = async () => {
        try {
            const all = await this.manager.read()
            return all            
        } catch (error) {
            throw error
        }
    }

    readOne = async (id) => {
        try {
            const one = await this.manager.readOne(id)
            return one            
        } catch (error) {
            throw error
        }
    }

    paginate = async ({filter, sortAndPaginate}) => {
        try {
            const some = await this.manager.paginate({ filter, sortAndPaginate })
            return some
        } catch (error) {
            throw error
        }
    }

    aggregate = async (pipeline) => {
        try {
            const aggregated = await this.manager.aggregate(pipeline)
            return aggregated            
        } catch (error) {
            throw error            
        }
    }

    update = async ({id, data}) => {
        try {

            const one = await this.manager.update({id, data})
            if(one) {
                return one
            } 
            else {
                const error = new Error('Error while updating.')
                error.statusCode = 500
            }
        } catch (error) {
            throw error
        }
    }

    destroy = async (id) => {
        try {
            const one = this.manager.destroy(id)
            return one            
        } catch (error) {
            throw error
        }
    }

    readLastByUser = async (user_id) => {
        try {
            const last = await this.manager.readLastByUser(user_id)
            return last            
        } catch (error) {
            throw error
        }
    }

    readLast = async () => {
        try {
            const last = await this.manager.readLast()
            return last
        } catch (error) {
            throw error
        }
    }

    destroyMany = async ({user_id}) => {
        try {
            const itemsDeleted = await this.manager.destroyMany({user_id})
            return itemsDeleted            
        } catch (error) {
            throw error
        }
    }

    readByEmail = async (email) => {
        
        try {
            const one = await this.manager.readByEmail(email)
            return one            
        } catch (error) {
            throw error
        }
    }
}

const usersRepository = new UsersRepository()
export default usersRepository