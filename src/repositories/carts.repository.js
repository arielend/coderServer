import dao from '../DAO/dao.factory.js'
import CartsDTO from '../DTO/carts.dto.js'
const { cartsManager } = dao

class CartsRepository {

    constructor () {
        this.manager = cartsManager
    }

    create = async (data) => {
        try {
            data = new CartsDTO(data)
            const one = await this.manager.create(data)
            return one
        } catch (error) {
            throw error
        }
    }

    read = async (filter) => {
        try {
            const all = await this.manager.read(filter)
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

    update = async (id, data) => {
        try {
            data = new CartsDTO(data)
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

    paginate = async ({filter, sortAndPaginate}) => {
        try {
            const paginated = await this.manager.paginate({filter, sortAndPaginate})
            return paginated
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

    readLast = async () => {
        try {
            const last = await this.manager.readLast()
            return last
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

    destroyMany = async (deleteArgs) => {
        try {
            const many = await this.manager.destroyMany(deleteArgs)            
            return many
        } catch (error) {
            throw error
        }
    }
}

const cartsRepository = new CartsRepository()
export default cartsRepository