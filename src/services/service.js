class Service {
    constructor(repository){
        this.repository = repository
    }

    createService = async (data) => {
        try {
            const one = await this.repository.create(data)
            return one
        } catch (error) {
            throw error
        }
    }

    readService = async (filter) => {
        try {
            const many = await this.repository.read(filter)
            return many            
        } catch (error) {
            throw error
        }
    }

    readOneService = async (id) => {
        try {
            const one = await this.repository.readOne(id)
            return one            
        } catch (error) {
            throw error
        }
    }

    paginateService = async (filter, options) => {
        try {
            const many = await this.repository.paginate(filter, options)
            return many            
        } catch (error) {
            throw error
        }
    }

    updateService = async (id, data) => {
        try {
            const one = await this.repository.update(id, data)
            return one
        } catch (error) {
            throw error
        }
    }

    destroyService = async (id) => {
        try {
            const one = this.repository.destroy(id)
            return one            
        } catch (error) {
            throw error
        }
    }

    readLastByUserService = async (user_id) => {
        try {
            const one = await this.repository.readLastByUser(user_id)
            return one
        } catch (error) {
            throw error
        }
    }

    readLastService = async () => {
        try {
            const one = await this.repository.readLast()
            return one            
        } catch (error) {
            throw error
        }
    }

    readByEmailService = async (email) => {
        try {
            const one = await this.repository.readByEmail(email)
            //console.log('Lo que devuelve one en readbyemail del service: ', one);
            return one            
        } catch (error) {
            throw error
        }
    }

    destroyManyService = async (user_id) => {
        try {
            const many = await this.repository.destroyMany(user_id)
            return many
        } catch (error) {
            throw error
        }
    }
}

export default Service