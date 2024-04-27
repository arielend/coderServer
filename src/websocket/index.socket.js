import { productsManager, usersManager } from '../data/managers/managers.js'


async function socketCallback (socket) {

    console.log(`Cliente ${socket.id} connected.`)

    socket.emit('products', await productsManager.read())
    socket.emit('users', await usersManager.read())

    socket.on('createProduct', async (data) => {
        await productsManager.create(data)
        //Posiblemente haya que volver a emitir cuando se ejecute sin nodemon
    })

    socket.on('register', async (data) => {
        await usersManager.create(data)
        //Posiblemente haya que volver a emitir cuando se ejecute sin nodemon
    })

}

export default socketCallback