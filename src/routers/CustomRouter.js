import { Router, request } from 'express'
import { verifyToken } from '../utils/token.js'
import usersManager from '../data/mongo/managers/usersManager.js'

class CustomRouter {

    //Construir las instancias del enrutador
    constructor () {
        this.router = Router()
        this.init()
    }

    //Obtener la instancia del enrutador
    getRouter () {
        return this.router
    }

    init () {}

    //Manejo de la implememtación de los middlewares y la callback final
    applyCBS (callbacks) {
        return callbacks.map( (callback) => async (...params) => {
            try {
                await callback.apply(this, params)                
            } catch (error) {
                return params[2](error)
            }
        })
    }

    response = (request, response, next) => {

        response.status200 = (payload) => {
            return response.json({
                statusCode: 200,
                response: payload
            }) 
        }
        

        response.paginate = (response, paginationInfo ) => {
            return response.json({
                statusCode: 200,
                paginationInfo,
                response
            })
        }
        
        response.status201 = (message) => {
            return response.json({
                statusCode: 201,
                message
            })
        }

        response.status204 = (message) => {
            return response.json({
                statusCode: 204,
                message
            })
        }
        
        response.status400 = () => {
            return response.json({
                statusCode: 400,
                message: 'Bad request!'
            })
        }

        response.status401 = () => {
            return response.json({
                statusCode: 401,
                mensaje: "Bad auth!"
            })
        }

        response.status403 = () => {
            return response.json({
                statusCode: 403,
                mensaje: "Forbidden!"
            })
        }

        response.status404 = () => {
            return response.json({
                statusCode: 404,
                message: "Not found!"
            })
        }

        response.status500 = (error) => {
            return response.json({
                statusCode: 500,
                message: error.message
            })
        }

        return next()
    }

    policies = (policies) => async(request, response, next) => {

        if(policies.includes('PUBLIC')) {
            return next()       
        }
        else{
            const token = request.signedCookies.token
            if(token){
                const { role, email } = verifyToken(token)

                if((policies.includes('ADMIN') && role === 'admin') || (policies.includes('CUSTOMER') && role === 'customer')){
                    const user = await usersManager.readByEmail(email)
                    delete user.password
                    request.user = user
                    return next()
                }
                else{
                    return response.status403()
                }
            }
            else{
                return response.status401()
            }
        }
    }

    create(path, policies, ...callbacks) { this.router.post(path, this.response, this.policies(policies), this.applyCBS(callbacks))}
    read(path, policies, ...callbacks) { this.router.get(path, this.response, this.policies(policies), this.applyCBS(callbacks))}
    readOne(path, policies, ...callbacks) {this.router.get(path, this.response, this.policies(policies), this.applyCBS(callbacks))}
    paginate(path, policies, ...callbacks) { this.router.get(path, this.response, this.policies(policies), this.applyCBS(callbacks))}
    update(path, policies, ...callbacks) { this.router.put(path, this.response, this.policies(policies), this.applyCBS(callbacks))}
    destroy(path, policies, ...callbacks) { this.router.delete(path, this.response, this.policies(policies), this.applyCBS(callbacks))}
    destroyMany(path, policies, ...callbacks) {this.router.delete(path, this.response, this.policies(policies), this.applyCBS(callbacks))}
    readLast(path, policies, ...callbacks) {this.router.get(path, this.response, this.policies(policies), this.applyCBS(callbacks))}
    readLastByUser(path, policies, ...callbacks) {this.router.get(path, this.response, this.policies(policies), this.applyCBS(callbacks))}
    use(path, ...callbacks) { this.router.use(path, this.response, this.applyCBS(callbacks))}
    
}

export default CustomRouter