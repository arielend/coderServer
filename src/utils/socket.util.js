import { Server } from 'socket.io'

let io

export function initializeSocket (httpServer) {
    io = new Server(httpServer)
    return io
}

export function getSocket () {
    if(!io) {
        throw new Error('Socket.IO has not been initialized!')
    }
    else {
        return io
    }
}