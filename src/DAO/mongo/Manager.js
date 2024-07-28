class Manager {

    constructor (Model) {
        this.Model = Model
    }

    async create (data) {
        try {
            const created = await this.Model.create(data)
            return created
        } catch (error) {
            throw error
        }
    }

    async read (filter = {}) {
        try {
            const items = await this.Model.find(filter).lean()
            return items            
        } catch (error) {
            throw error            
        }
    }

    async readOne (id) {
        try {
            const one = await this.Model.findOne({id})
            return one            
        } catch (error) {
            throw error            
        }
    }

    async destroy (id) {
        try {
            const one = await this.Model.findOneAndDelete(id).lean()
            return one            
        } catch (error) {            
            throw error            
        }
    }

    async update ({id, data}) {
        try {
            const one = await this.Model.findByIdAndUpdate(id, data, { new: true}).lean()
            return one            
        } catch (error) {            
            throw error            
        }
    }

    async paginate({ filter, sortAndPaginate }) {
        try {
            const paginatedItems = await this.Model.paginate(filter, sortAndPaginate)
            return paginatedItems            
        } catch (error) {            
            throw error
        }
    }

    async aggregate (pipeline) {

        try {
            const aggregatedItem = await this.Model.aggregate(pipeline)
            return aggregatedItem
        } catch (error) {
            throw error
        }
    }

    async readLast() {
        try {
            const lastItem = await this.Model.findOne({}, {}, { sort: { '_id' : -1 } }).lean()
            return lastItem
        } catch (error) {
            throw error
        }
    }

    async readLastByUser(user_id) {
        try {
            const lastItem = await this.Model.findOne({ user_id }, {}, { sort: { '_id' : -1 } }).lean()
            return lastItem
        } catch (error) {
            throw error
        }
    }

    async readByEmail (email) {

        try {
            const one = await this.Model.findOne({email}).lean()
            return one
        } catch (error) {
            throw error
        }
    }

    async destroyMany ({user_id}) {
        try {
            const deletedItems = await this.Model.deleteMany({user_id}).lean()
            return deletedItems
        } catch (error) {
            throw error
        }
    }    
}

export default Manager