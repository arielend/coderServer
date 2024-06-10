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

    async read () {
        try {
            const allItems = await this.Model.find({filter}).lean()
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
            const itemFound = await this.Model.findOne({_id: id}).lean()

            //Formateo de fecha
            if (itemFound && itemFound.date) {
                itemFound.date = formatDate(itemFound.date);
            }

            return itemFound            
        } catch (error) {
            console.log(error)
            throw error            
        }
    }

    async readLast() {
        try {
            const lastItem = await this.Model.findOne({}, {}, { sort: { '_id' : -1 } }).lean()

            //Formateo de fecha
            if (lastItem && lastItem.date) {
                lastItem.date = formatDate(lastItem.date)
            }

            return lastItem
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async readLastByUser(user_id) {
        try {
            const lastItem = await this.Model.findOne({ user_id: user_id }, {}, { sort: { '_id' : -1 } }).lean()

            //Formateo de fecha
            if (lastItem && lastItem.date) {
                lastItem.date = formatDate(lastItem.date)
            }

            return lastItem
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async readByEmail (email) {
        
        try {
            const response = await this.Model.findOne({email}).lean()
            return response            
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
            const itemDeleted = await this.Model.findOneAndDelete(id).lean()
            return itemDeleted              
        } catch (error) {
            console.log(error)
            throw error            
        }
    }

    async destroyMany ({user_id}) {
        try {
            const itemsDeleted = await this.Model.deleteMany({user_id}).lean()
            return itemsDeleted
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

//Función para formatear la fecha mostrada desde Mongo
function formatDate (dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export default Manager