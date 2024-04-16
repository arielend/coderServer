import express from 'express'
import morgan from 'morgan'
import indexRouter from './src/routers/index.router.js'
import errorHandler from './src/middlewares/errorHandler.js'
import pathHandler from './src/middlewares/pathHandler.js'

// Server
const server = express()
const port = 8080
const ready = () => { console.log(`Server ready on http://localhost:${port}/`) }

server.listen(port, ready)

// Middlewares
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(morgan("dev"))

// Router
server.use('/', indexRouter)

//Error and Path handling
server.use(errorHandler)
server.use(pathHandler)