class Manager {

    constructor (Model) {
        this.Model = Model
    }

    async create (data) {
        try {
            const itemCreated = await this.Model.create(data)
            return itemCreated
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async read (filter) {
        try {
            const allItems = await this.Model.find(filter).lean()
            return allItems            
        } catch (error) {
            console.log(error)
            throw error            
        }
    }
  
  async paginate({ filter, sortAndPaginate }) {
        try {
            const allItems = await this.Model.paginate(filter, sortAndPaginate)
            return allItems            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async aggregate (obj) {

        try {
            const result = await this.Model.aggregate(obj)
            return result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async readOne (id) {
        try {
            //const itemFound = await this.Model.findById(id)
            const itemFound = await this.Model.findOne({_id: id}).lean()
            return itemFound            
        } catch (error) {
            console.log(error)
            throw error            
        }
    }

    async update (id, data) {
        try {
            const itemUpdated = await this.Model.findByIdAndUpdate(id, data, { new: true}).lean()
            return itemUpdated            
        } catch (error) {
            console.log(error)
            throw error            
        }
    }

    async destroy (id) {
        try {
            const itemDeleted = this.Model.findOneAndDelete(id).lean()
            return itemDeleted              
        } catch (error) {
            console.log(error)
            throw error            
        }
    }
}

export default Manager