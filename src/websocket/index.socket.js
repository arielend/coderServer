//import productsManager from '../data/fs/ProductsManager.js'

import { productsManager } from '../data/managers/managers.js'


async function socketCallback (socket) {

    console.log(`Cliente ${socket.id} connected.`)

    socket.emit('products', await productsManager.read())

    socket.on('createProduct', async (data) => {
        await productsManager.create(data)
    })

}

export default socketCallback