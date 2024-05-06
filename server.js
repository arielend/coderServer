import 'dotenv/config.js'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import socketCallback from './src/websocket/index.socket.js'
import chatSocketCallback from './src/websocket/chat.socket.js'

import dbConnect from './src/utils/dbConnection.js'
import morgan from 'morgan'
import indexRouter from './src/routers/index.router.js'
import errorHandler from './src/middlewares/errorHandler.js'
import pathHandler from './src/middlewares/pathHandler.js'

import { engine } from 'express-handlebars'
import __dirname from './utils.js'

// Server
const server = express()
const port = 8080
const ready = async () => { 
    console.log(`Server ready on http://localhost:${port}/`)
    await dbConnect()
}

const nodeServer = createServer(server)
const io = new Server(nodeServer)

nodeServer.listen(port, ready)

io.on('connection', socketCallback)

//SOCKET NAMESPACES
//Realtime products Namespace
const productsNamespace = io.of('/products')
productsNamespace.on('connection', socketCallback)

//Chat Namespace
const chatNamespace = io.of('/chat')
chatNamespace.on('connection', chatSocketCallback)

//Export del servidor de socket
export { io }

// Templates engine (Handlebars)
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')

// Middlewares
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.static(__dirname + '/public'))
server.use(morgan("dev"))

// Router
server.use('/', indexRouter)

//Error and Path handling
server.use(errorHandler)
server.use(pathHandler)