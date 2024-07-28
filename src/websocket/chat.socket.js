// import { getSocket } from '../utils/socket.util.js'

// let messagesArray = []

// const io = async () => await getSocket()
// const chatNamespace = io.of('/chat')
// chatNamespace.on('connection', chatSocketCallback)

// async function chatSocketCallback () {
    
//     console.log(`Cliente del chat ${io.id} online.`)    
//     io.emit('server messages', messagesArray)
    
//     io.on('client message', async (clientMessage) => {        
//         messagesArray.push(clientMessage)        
//         io.of('/chat').emit('server messages', messagesArray)        
//     })    
// }


// export default chatSocketCallback