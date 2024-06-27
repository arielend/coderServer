import environment from './src/utils/env.util.js'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import socketCallback from './src/websocket/index.socket.js'
import chatSocketCallback from './src/websocket/chat.socket.js'
import cors from 'cors'

import morgan from 'morgan'
import indexRouter from './src/routers/index.router.js'
import errorHandler from './src/middlewares/errorHandler.js'
import pathHandler from './src/middlewares/pathHandler.js'

import { engine } from 'express-handlebars'
import Handlebars from 'handlebars'

import __dirname from './utils.js'
import argsUtil from './src/utils/args.util.js'

// Server
const server = express()
const port = environment.PORT || argsUtil.port
const ready = async () => { 
    console.log(`Server ready on http://localhost:${port}/`)
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

// Configuro Helpers de Handlebars
Handlebars.registerHelper('multiply', (a, b) => {return a * b})
Handlebars.registerHelper('calculateTotal', function(userCarts) {
    let total = 0
    userCarts.forEach(item => {
        total += item.product_id.price * item.product_quantity
    })
    return total.toFixed(2)
})

// Middlewares
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.static(__dirname + '/public'))
server.use(cookieParser(environment.SECRET_COOKIE))
server.use(morgan("dev"))
server.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// Router
server.use('/', indexRouter)

//Error and Path handling
server.use(errorHandler)
server.use(pathHandler)

// process.on('exit', (code)=>{
//     console.log('Cerrando un proceso')
//     console.log(code)
// })

// process.exit()
