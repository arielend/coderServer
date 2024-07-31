//Módulos nativos de Node.js
import { cpus } from 'os'
import cluster from 'cluster'

//Módulos de terceros
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'express-compression'
import { engine } from 'express-handlebars' //Eliminar una vez concluido el front con react
import Handlebars from 'handlebars' //Eliminar una vez concluido el front con react

//Módulos locales
import environment from './src/utils/env.util.js'
import Winston from './src/middlewares/winston.js'
import indexRouter from './src/routers/index.router.js'
import errorHandler from './src/middlewares/errorHandler.js'
import pathHandler from './src/middlewares/pathHandler.js'
import __dirname from './utils.js'
import argsUtil from './src/utils/args.util.js'

//Configuración del Server
const server = express()
const port = environment.PORT || argsUtil.port
const ready = async () => { 
    console.log(`Server ready on http://localhost:${port}/`)
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
    console.log(`Worker proccess: ${process.pid}.`)
    server.listen(port, ready)
}

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
server.use(Winston)
server.use(cors({ origin: 'http://localhost:5173', credentials: true }))
server.use(compression({
    brotli:{ enabled: true, zlib:{}}
}))

// Router
server.use('/', indexRouter)

//Error and Path handling
server.use(errorHandler)
server.use(pathHandler)