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

    async read (filter = []) {
        try {
            const allItems = await this.Model.find()
            return allItems            
        } catch (error) {
            console.log(error)
            throw error            
        }
    }

    async readOne (id) {
        try {
            const itemFound = await this.Model.findById(id)
            return itemFound            
        } catch (error) {
            console.log(error)
            throw error            
        }
    }

    async update (id, data) {
        try {
            const itemUpdated = await this.Model.findByIdAndUpdate(id, data, { new: true})
            return itemUpdated            
        } catch (error) {
            console.log(error)
            throw error            
        }
    }

    async destroy (id) {
        try {
            const itemDeleted = this.Model.findOneAndDelete(id)
            return itemDeleted              
        } catch (error) {
            console.log(error)
            throw error            
        }
    }
}

export default Manager