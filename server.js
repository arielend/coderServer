import 'dotenv/config.js'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import fileStore from 'session-file-store'
import MongoStore from 'connect-mongo'
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
server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(morgan("dev"))
//const FileStore = sessionFilestore(session)
server.use(
    session({
        // Solo usar un store ( Local / Mongo )
        // store: new FileStore({
        //     path: './src/data/fs/files/sessions',
        //     ttl: 3600,
        //     retries: 2
        // }),
        store: new MongoStore({
            mongoUrl: process.env.MONGO_URI,
            ttl: 3600
        }),
        secret: process.env.SECRET_SESSION,
        resave: true,
        saveUninitialized: true,
        //cookie: { maxAge: 360000 }
    })
)

// Router
server.use('/', indexRouter)

//Error and Path handling
server.use(errorHandler)
server.use(pathHandler)