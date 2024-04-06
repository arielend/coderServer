import productsManager from '../data/fs/ProductsManager.js'

async function socketCallback (socket) {

    console.log(`Cliente ${socket.id} connected.`)

    socket.emit('products', await productsManager.read())

}

export default socketCallback