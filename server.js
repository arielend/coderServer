import express from 'express'

const server = express()
const port = 8080
const ready = () => { console.log(`Server ready on http://localhost:${port}/`) }

server.listen(port, ready)

// Middleware
server.use(express.json())
server.use(express.urlencoded({ extended: true }))


//Endpoints de ProductsManager


//Endpoints de UsersManager