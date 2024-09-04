class Manager {

    constructor (model) {
        this.model = model
    }

    async create (data) {
        try {
            //console.log('La data que llega a create del manager: ', data)
            const one = await this.model.create(data)
            //console.log('Lo que retorna el one de create en manager: ', one)
            return one
        } catch (error) {
            throw error
        }
    }

    async read (filter) {
        try {
            const many = await this.model.find(filter)
            return many
        } catch (error) {
            throw error
        }
    }

    async readOne(id) {
        try {
            const one = await this.model.findOne({ _id: id })
            return one
        } catch (error) {
            throw error
        }
    }

    async readBySessionId (id) {
        try {
            const one = await this.model.findOne({session_id: id})
            return one
        } catch (error) {
            
        }
    }

    async readByEmail(email) {
        try {
            const one = await this.model.findOne({email}).lean()            
            return one
        } catch (error) {
            throw error
        }
    }

    async paginate(filter, options) {
        try {
            const many = await this.model.paginate(filter, options)
            return many
        } catch (error) {
            throw error
        }
    }

    async update(id, data) {        
        try {
            const one = await this.model.findByIdAndUpdate( {_id:id}, data, { new:true } )            
            return one
        } catch (error) {
            throw error
        }
    }

    async destroy(id) {
        try {
            const one = await this.model.findOneAndDelete( { _id: id } )
            return one
        } catch (error) {
            throw error
        }
    }

    async destroyMany(deleteArgs) {
        try {
            const many = await this.model.deleteMany(deleteArgs)
            return many
        } catch (error) {
            throw error
        }
    }

    async readLast() {
        try {            
            const one = await this.model.findOne({}, {}, { sort: { '_id' : -1}})
            return one
        } catch (error) {
            throw error
        }
    }
    
    async readLastByUser(user_id) {
        try {
            const one = await this.model.findOne({ user_id }, {}, { sort: { '_id' : -1}})
            return one
        } catch (error) {
            throw error
        }
    }

    async aggregate(pipeline){
        try {
            const one = await this.model.aggregate(pipeline)
            return one
        } catch (error) {
            throw error
        }
    }

}

export default Manager