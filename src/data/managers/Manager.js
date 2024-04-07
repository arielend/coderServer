import fs from 'fs'
import crypto from 'crypto'

class Manager {

    constructor (path, itemName, requiredFields = []) {
        this.path = path
        this.itemName = itemName
        this.requiredFields = requiredFields
        this.init()
    }

    init() {
        const exists = fs.existsSync(this.path)

        if(!exists) {
            const allItems = []
            const allItemsString = JSON.stringify(allItems, null, 4)

            fs.writeFileSync(this.path, allItemsString)
            console.log(`File in path ${this.path} has been created.`)
        }
        else {
            console.log(`File in path ${this.path} already exists.`)
        }
    }

    async create (data) {

        try {

            //if(Object.keys(data).length ===0) {}
            if(!data) {
                const error = new Error('Bad request: the create method requires a data object that has not been passed as a parameter.')
                error.statusCode = 400
                throw error
            }

            const missingFields = []

            for (const field of this.requiredFields) {
                if (!data[field]) {
                    missingFields.push(field)
                }
            }

            if(missingFields.length > 0) {
                const error = new Error(`Bad request: required fields missing: ${missingFields}`)
                error.statusCode = 400
                throw error
            }

            const newItem = {}
            newItem.id = crypto.randomBytes(12).toString('hex')
            for (const field in data) {
                newItem[field] = data[field]
            }

            let allItems = await fs.promises.readFile(this.path, 'utf-8')
            allItems = JSON.parse(allItems)
            allItems.push(newItem)
            allItems = JSON.stringify(allItems, null, 4)

            await fs.promises.writeFile(this.path, allItems)

            console.log(`New ${this.itemName} created with ID ${newItem.id}`);

        } catch (error) {
            console.log(`An error has ocurred at create a new ${this.itemName}: ${error}`)
            return null
        }
    }

    async read (filters = []) {

        try {

            let allItems = await fs.promises.readFile(this.path, 'utf-8')
            allItems = JSON.parse(allItems)

            if(allItems.length === 0) {
                const error = new Error(`Not found: not ${this.itemName} to show. Empty file.`)
                error.statusCode = 404
                throw error
            }
            else {

                if(filters.length === 0) {
                    return allItems
                } else {
                    let filteredItems = [...allItems]

                    filters.forEach((filtro)=>{

                        const propiedad = Object.keys(filtro)[0]
                        const valor = filtro[propiedad]

                        //TO DO: Implementar validación para que en los casos de propiedades con valor numerico como stock o precio no tome el includes

                        filteredItems = filteredItems.filter( item => item[propiedad] == valor || item[propiedad].toString().toLowerCase().includes(valor)  )
                    })

                    return filteredItems
                }
            }            
        } catch (error) {
            console.log(`An error has ocurred while reading the ${this.itemName}s: `, error)
            throw error
        }
    }

    async readOne (id) {

        try {

            if(!id) {
                const error = new Error('Bad request: the ID parameter is required by the readOne method.')
                error.statusCode = 400
                throw error
            }
            else {

                let allItems = await this.read()
                const itemFound = allItems.find ( item => item.id === id)

                if(!itemFound) {
                    console.log(`No ${this.itemName} found with ID ${id}.`)
                    return null
                } else {
                    console.log(`Found ${this.itemName}: `, itemFound)
                    return itemFound
                }                
            }

        } catch (error) {
            console.log(`An error has ocurred while reading the ${this.itemName}: `, error)
            return null
        }
    }

    async destroy (id) {

        try {

            if(!id){
                const error = new Error('Bas request: the ID parameter is required by the destroy method.')
                error.statusCode = 400
                throw error
            } else {
                
                let allItems = await this.read()
                const itemFound = allItems.find ( item => item.id === id)

                if(!itemFound) {
                    console.log(`No ${this.itemName} found with ID ${id}.`)
                    return null
                } else {

                    let itemsUpdated = allItems.filter ( item => item.id !== id)
                    itemsUpdated = JSON.stringify(itemsUpdated, null, 4)

                    await fs.promises.writeFile(this.path, itemsUpdated)
                    console.log(`The ${this.itemName} with ID ${id} has been deleted.`)
                    return itemFound                        
                }                
            }
            
        } catch (error) {
            console.log(`An error has ocurred while deleting the ${this.itemName}: `, error)
            return null            
        }
    }

    async update(id, data) {

        try {
    
            if(!id) {
                const error = new Error('Bad request: the ID parameter is required by the update method.')
                error.statusCode = 400
                throw error
            }
    
            let allItems = await this.read()
            let itemFound = allItems.find( item => item.id === id)
    
            if(!itemFound) {
                console.log(`No ${this.itemName} found with ID ${id}.`)
                return null
            } else {
    
                itemFound = Object.assign(itemFound, data)
                allItems = JSON.stringify(allItems, null, 4)
    
                await fs.promises.writeFile(this.path, allItems)
                console.log(`The ${this.itemName} whit ID ${id} has been updated.`)
                return itemFound
            }
            
        } catch (error) {
            console.log(`An error has ocurred while updating the ${this.itemName}: `), error
            throw error
        }    
    }
}

export default Manager