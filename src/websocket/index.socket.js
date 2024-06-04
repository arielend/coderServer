//import { io } from '../../server.js'
import productsManager from '../data/mongo/managers/productsManager.js'
import usersManager from '../data/mongo/managers/usersManager.js'

async function socketCallback (socket) {

    console.log(`Cliente ${socket.id} connected.`)

    socket.emit('products', await productsManager.read())
    //socket.emit('users', await usersManager.read())

    socket.on('createProduct', async (data) => {
        await productsManager.create(data)
        socket.emit('products', await productsManager.read())
    })

    socket.on('register', async (data) => {
        await usersManager.create(data)
        socket.emit('users', await usersManager.read())
    })
}

export default socketCallback