class Manager {

    static #items = []

    create(data){

        const newOne = {}
        for (const field in data) {
            newOne[field] = data[field]
        }
        Manager.#items.push(newOne)
        return newOne
    }

    read(filter = {}){
        try {
            const items = Manager.#items.filter( item => this.matchFilter(filter, item))
            return items            
        } catch (error) {
            throw error
        }
    }

    readOne (id) {
        try {
            const items = this.read()
            const one = items.find( item => item.id === id)
            return one            
        } catch (error) {
            throw error            
        }       
    }

    destroy (id) {
        try {
            const items = this.read()
            Manager.#items = items.filter( item => item.id != id)
            const deletedOne = items.find( item => item.id == id)
            return deletedOne            
        } catch (error) {
            throw error
        }
    }

    update (id, data) {
        try {
            const items = this.read()
            const one = items.find( item => item.id === id)
            one = Object.assign(one, data)
            return one            
        } catch (error) {
            throw error
        }        
    }

    paginate (filter = {}, sortAndPaginate = {}) {
        try {
            const items = this.read(filter)
            const { page = 1, limit = 10, sort = {}, prevPage, nextPage } = sortAndPaginate
            const sortedItems = this.sortItems(items, sort)
            const totalDocs = sortedItems.length
            const totalPages = Math.ceil(totalDocs/limit)
            const paginatedItems = sortedItems.slice((page - 1) * limit, page * limit)
            
            return {
                docs: paginatedItems,
                totalDocs,
                totalPages,
                page,
                limit,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: page < totalPages ? page + 1 : null
            }            
        } catch (error) {
            throw error
        }
    }

    aggregate (pipeline) {
        const error = new Error('Aggregate operation not supported for FileManager!')
        error.statusCode = 500
        throw error
    }

    readLast () {
        try {
            const items = this.read()
            const lastItem = items[items[items.length -1]]
            return lastItem            
        } catch (error) {
            throw error
        }
    }

    readLastByUser(user_id) {
        try {
            const filter = {user_id}
            const items = this.read(filter)
            const lastItem = items[items.length -1]
            return lastItem            
        } catch (error) {
            throw error
        }
    }

    readByEmail (email) {
        try {
            const items = this.read()
            const one = items.find( item => item.email === email)
            return one            
        } catch (error) {
            throw error
        }
    }

    destroyMany (user_id) {
        try {
            const items = this.read()
            Manager.#items = items.filter( item => item.user_id != user_id)
            const deletedItems = items.filter( item => item.user_id == user_id)
            return deletedItems            
        } catch (error) {
            throw error
        }
    }

    //Funciones de filtrador y ordenamiento
    matchFilter(item, filter) {
        return Object.keys(filter).every(key => item[key] === filter[key]);
    }

    sortItems(items, sort) {
        const sortKeys = Object.keys(sort);
        if (sortKeys.length === 0) {
            return items;
        }
        return items.sort((a, b) => {
            for (let key of sortKeys) {
                if (a[key] < b[key]) return sort[key] === 'asc' ? -1 : 1;
                if (a[key] > b[key]) return sort[key] === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
}

export default Manager