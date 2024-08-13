import dao from '../DAO/dao.factory.js'
import ProductsDTO from '../DTO/products.dto.js'
const { productsManager } = dao

class ProductsRepository {

    constructor () {
        this.manager = productsManager
    }

    create = async (data) => {
        try {
            data = new ProductsDTO(data)
            const one = await this.manager.create(data)
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

    paginate = async (filter, options) => {
        try {
            const paginated = await this.manager.paginate(filter, options)
            return paginated
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

    readLast = async () => {
        try {
            const one = await this.manager.readLast()
            return one
        } catch (error) {
            
        }
    }
}

const productsRepository = new ProductsRepository()
export default productsRepository