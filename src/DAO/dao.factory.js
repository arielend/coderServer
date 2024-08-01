import argsUtil from '../utils/args.util.js'
import dbConnect from '../utils/dbConnection.js'

const persistence = argsUtil.pers

let dao = {}

switch(persistence){
    case 'fs':
        const { default: usersManagerFS } = await import ('./fs/managers/usersManager.js')
        const { default: cartsManagerFS } = await import ('./fs/managers/cartsManager.js')
        const { default: productsManagerFS } = await import ('./fs/managers/productsManager.js')
        dao = {
            usersManager: usersManagerFS,
            cartsManager: cartsManagerFS,
            productsManager: productsManagerFS
        }
        console.log('Connected to filesystem.')
    break

    case 'memory':
        const { default: usersManagerMemory } = await import ('./memory/managers/usersManager.js')
        const { default: cartsManagerMemory } = await import ('./memory/managers/cartsManager.js')
        const { default: productsManagerMemory } = await import ('./memory/managers/productsManager.js')
        dao = {
            usersManager: usersManagerMemory,
            cartsManager: cartsManagerMemory,
            productsManager: productsManagerMemory
        }
        console.log('Connected to memory.')
    break

    case 'mongo':
        dbConnect()
        const { default: usersManagerMongo } = await import('./mongo/managers/usersManager.js')
        const { default: cartsManagerMongo } = await import('./mongo/managers/cartsManager.js')
        const { default: productsManagerMongo } = await import('./mongo/managers/productsManager.js')
        dao = {
            usersManager: usersManagerMongo,
            cartsManager: cartsManagerMongo,
            productsManager: productsManagerMongo
        }
        console.log('Connected to Mongo Database.')        
    break

    default:
        console.log('Default connection: mongo.')
    break
}

export default dao