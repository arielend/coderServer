import dao from '../DAO/dao.factory.js'
const { ordersManager } = dao

class OrdersRepository {

    constructor () {
        this.manager = ordersManager
    }

    create = async (data) => {
        try {
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
            const one = await this.manager.readBySessionId(id)
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
}

const ordersRepository = new OrdersRepository()
export default ordersRepository