class Service {

    constructor(manager) {
        this.manager = manager
    }

    createService = async (data) => {
        try {
            const one = await this.manager.create(data)
            if(one){
                return one
            }
            else{
                const error = new Error('Error while creating item.')
                error.statusCode = 500
            }
        } catch (error) {
            throw error
        }
    }

    readService = async () => {
        try {
            const many = await this.manager.read()
            if(many){
                return many
            }
            else{
                const error = new Error('Not found.')
                error.statusCode = 404
            }
        } catch (error) {
            throw error
        }
    }

    readOneService = async (id) => {
        try {
            const one = await this.manager.readOne(id)
            if(one){
                return one
            }
            else{
                const error = new Error('Not found.')
                error.statusCode = 404
            }
        } catch (error) {
            throw error
        }
    }

    paginateService = async ({filter, sortAndPaginate}) => {
        try {
            const some = await this.manager.paginate({ filter, sortAndPaginate })
            if(some){
                return some
            }
            else{
                const error = new Error('Not found.')
                error.statusCode = 404
            }
        } catch (error) {
            throw error
        }
    }

    updateService = async ({id, data}) => {
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

    destroyService = async (id) => {
        try {
            const one = this.manager.destroy(id)
            if(one) {
                return one
            }
            else {
                const error = new Error('Error while deleting.')
                error.statusCode = 500
            }
        } catch (error) {
            throw error
        }
    }

    readLastUserInsertionService = async (user_id) => {
        try {
            const last = await this.manager.readLastByUser(user_id)
            if(last) {
                return last
            }
            else {
                const error = new Error('Not found.')
                error.statusCode = 404
            }
        } catch (error) {
            throw error
        }
    }

    readLastInsertionService = async () => {
        try {
            const last = await this.manager.readLast()
            if(last) {
                return last
            }
            else {
                const error = new Error('Not found.')
                error.statusCode = 404
            }
            
        } catch (error) {
            throw error
        }
    }

    destroyManyService = async ({user_id}) => {
        try {
            const itemsDeleted = await this.manager.destroyMany({user_id})
            console.log('Esto es idems deleted en el service: ', itemsDeleted)
            if(itemsDeleted) {
                return itemsDeleted
            }
            else {
                const error = new Error('Not found.')
                error.statusCode = 404
            }
        } catch (error) {
            throw error
        }
    }
}

export default Service