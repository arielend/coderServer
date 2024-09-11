//Módulos nativos de Node.js
import { cpus } from 'os'
import cluster from 'cluster'

//Módulos de terceros
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'express-compression'
import swaggerJSDoc from 'swagger-jsdoc'
import { setup, serve } from 'swagger-ui-express'

//Módulos locales
import environment from './src/utils/env.util.js'
import Winston from './src/middlewares/winston.js'
import indexRouter from './src/routers/index.router.js'
import errorHandler from './src/middlewares/errorHandler.js'
import pathHandler from './src/middlewares/pathHandler.js'
import __dirname from './utils.js'
import argsUtil from './src/utils/args.util.js'
import swaggerOptions from './src/utils/swagger.js'

//Configuración del Server
const server = express()
const port = process.env.PORT || argsUtil.port
const url_base = environment.URL_BASE
const ready = async () => { 
    console.log(`Server ready on ${url_base}:${port}/`)
}

//Clustering
const numOfProc = cpus().length
if(cluster.isPrimary){
    console.log('Primary process.')
    for (let i = 1; i <= numOfProc; i++) {
        cluster.fork()        
    }
}
else {
    //console.log(`Worker proccess: ${process.pid}.`)
    server.listen(port, ready)
}

const specs = swaggerJSDoc(swaggerOptions)
const corsOptions = {
    origin: "https://coderserverfront.onrender.com",
    credentials: true
}

// Middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/public'))
server.use(Winston)
server.use(cookieParser(environment.SECRET_COOKIE))
server.use(cors(corsOptions))
server.use("/api/docs", serve, setup(specs))
server.use(compression({
    brotli:{ enabled: true, zlib:{}}
}))


// Router
server.use('/', indexRouter)

//Error and Path handling
server.use(errorHandler)
server.use(pathHandler)