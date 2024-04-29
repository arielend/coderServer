import { io } from "../../server.js"

let messagesArray = []

async function chatSocketCallback (socket) {
    
    console.log(`Cliente del chat ${socket.id} online.`)

    socket.emit('server messages', messagesArray)

    socket.on('client message', async (clientMessage) => {
        
        messagesArray.push(clientMessage)        
        io.of('/chat').emit('server messages', messagesArray)

    })

}

export default chatSocketCallback