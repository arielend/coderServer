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

    readByEmail = async (email) => {
        try {
            const one = await this.manager.readByEmail(email)
            return one
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

    update = async (id, data) => {
        try {
            const one = await this.manager.update(id, data)
            return one            
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
}

const usersRepository = new UsersRepository()
export default usersRepository