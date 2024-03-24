import express from 'express'
import usersManager from './app/fs/UsersManager.js'

const server = express()
const port = 8080
const ready = () => { console.log(`Server ready on http://localhost:${port}/`) }

server.listen(port, ready)

// Middleware
server.use(express.json())
server.use(express.urlencoded({ extended: true }))


//Endpoints de ProductsManager


//Endpoints de UsersManager
server.get('/api/users', async(req,res)=>{
    try{
        const {rol} = req.query
        const allUsers = rol ? await usersManager.read(rol) : await usersManager.read()
        if (allUsers.length !=0){
            return response.json({
                statusCode: 200,
                succes: true,
                response: allUsers
            })
        }else{
            const error = new Error('null')
            error.statusCode = 404
            throw error
        }
    }catch(error){
        console.log(error);
        return res.json({
            statusCode: error.statusCode || 'Error 500',
            response: null,
            message: error.message || {error}
        })
    }
        
})

server.get('/api/users/:id', async (req, res) => {
    try {

        const { id } = req.params
        const foundUser = await usersManager.readOne(id)

        if(foundUser) {
            return res.json({
                statusCode: 200,
                succes: true,
                response: foundUser
            })

        } else {
            const error = new Error(`User id ${id} not found`)
            error.statusCode = 404
            throw error
        }

    } catch (error) {
        console.log(error)
        return res.json({
            statusCode: error.statusCode || 'Error 500',
            response: null,
            message: error.message || {error}
        })        
    }
})