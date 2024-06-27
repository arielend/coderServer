import fs from 'fs'

class Manager {

    constructor (fileName) {
        this.fileName = fileName
        this.path = `./src/DAO/fs/files/${fileName}.json` 
        this.init()
    }

    init() {
        const exists = fs.existsSync(this.path)

        if(!exists) {
            const items = []
            const itemsString = JSON.stringify(items, null, 4)

            fs.writeFileSync(this.path, itemsString)
            console.log(`File in path ${this.path} has been created.`)
        }
        else {
            console.log(`File in path ${this.path} already exists.`)
        }        
    }

    async create (data) {

        try {
            const newOne = {}

            for (const field in data) {
                newOne[field] = data[field]
            }

            let items = await fs.promises.readFile(this.path, 'utf-8')
            items = JSON.parse(items)
            items.push(newOne)
            items = JSON.stringify(items, null, 4)

            await fs.promises.writeFile(this.path, items)
            return newOne

        } catch (error) {
            throw error
        }
    }

    async read (filter = {}) {

        try {
            let items = await fs.promises.readFile(this.path, 'utf-8')
            items = JSON.parse(items)
            items = items.filter( item => this.matchFilter(item, filter))

            if (this.fileName == "carts"){
                const products = fs.promises.readFile('./src/DAO/fs/files/products.json' , 'utf-8')
                items.map( item => {
                    item.product_id = products.find(product => product.id == item.product_id)
                })
            }
            return items
        } catch (error) {
            throw error
        }
    }

    async readOne (id) {
        try {            
            const items = await this.read()
            const one = items.find ( item => item.id === id)
            return one            
        }
        catch (error) {
            throw error
        }
    }

    async destroy (id) {
        try {
            const items = await this.read()
            const one = items.find ( item => item.id === id)
            let itemsUpdated = items.filter ( item => item.id !== id)
            itemsUpdated = JSON.stringify(itemsUpdated, null, 4)
            
            await fs.promises.writeFile(this.path, itemsUpdated)
            return one                            
            }
        catch (error) {
            throw error
        }
    }

    async update(id, data) {
        try {
            let items = await this.read()
            const one = items.find( item => item.id === id)
    
            one = Object.assign(one, data)
            items = JSON.stringify(items, null, 4)

            await fs.promises.writeFile(this.path, items)
            return one                        
        } catch (error) {
            throw error
        }    
    }

    async paginate ({filter = {}, sortAndPaginate = {}}) {
        try {
            const items = await this.read(filter)
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

    async aggregate(pipeline) {
        const error = new Error('Aggregate operation not supported for FileManager!')
        error.statusCode = 500
        throw error
    }

    async readLast () {
        try {
            const items = await this.read()
            const lastItem = items[items.length -1]
            return lastItem            
        } catch (error) {
            throw error
        }
    }

    async readLastByUser(user_id) {
        try {
            const filter = {user_id}
            const items = await this.read(filter)
            const lastItem = items[items.length -1]
            return lastItem            
        } catch (error) {
            throw error
        }
    }

    async readByEmail (email) {
        try {
            const items = await this.read()
            const one = items.find( item => item.email === email)
            return one                        
        } catch (error) {
            throw error
        }
    }

    async destroyMany (user_id) {
        try {
            const items = await this.read()
            const updatedItems = items.filter( item => item.user_id != user_id)
            const deletedItems = items.filter( item => item.user_id == user_id)
            updatedItems = JSON.stringify(updatedItems, null, 4)
            await fs.promises.writeFile(this.path, updatedItems)
            return deletedItems                        
        } catch (error) {
            throw error
        }
    }

    //Funciones de filtrador y ordenamiento
    matchFilter(item, filter) {
        return Object.keys(filter).every(key => item[key] === filter[key])
    }

    sortItems(items, sort) {
        const sortKeys = Object.keys(sort)
        if (sortKeys.length === 0) {
            return items
        }
        return items.sort((a, b) => {
            for (let key of sortKeys) {
                if (a[key] < b[key]) return sort[key] === 'asc' ? -1 : 1
                if (a[key] > b[key]) return sort[key] === 'asc' ? 1 : -1
            }
            return 0
        })
    }
}

export default Manager