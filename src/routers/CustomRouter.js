import { Router } from 'express'
import { verifyToken } from '../utils/token.js'
import dao from '../DAO/dao.factory.js'
import Winston from '../utils/winston.util.js'

const { usersManager } = dao
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

    response = (req, res, next) => {

        const logErrorMessage = `Verb: ${req.method} - URL: ${req.url} - Date: ${new Date().toLocaleString()} - Message: `

        res.response200 = (payload) => {
            return res.json({
                statusCode: 200,
                response: payload
            }) 
        }

        res.message200 = (message) => {
            return res.json({
                statusCode: 200,
                message
            }) 
        }
        

        res.paginate = (response, paginationInfo ) => {
            return res.json({
                statusCode: 200,
                paginationInfo,
                response
            })
        }
        
        res.message201 = (message) => {
            return res.json({
                statusCode: 201,
                message
            })
        }

        res.message204 = (message) => {
            return res.json({
                statusCode: 204,
                message
            })
        }
        
        res.error400 = () => {
            Winston.ERROR(logErrorMessage + '400: Bad request!')
            return res.json({
                statusCode: 400,
                message: srtMessage + 'Bad request!'
            })
        }

        res.error401 = () => {
            Winston.ERROR(logErrorMessage + '401: Bad auth!')
            return res.json({
                statusCode: 401,
                mensaje: "Bad auth!"
            })
        }

        res.error403 = () => {
            Winston.ERROR(logErrorMessage + '403: Forbidden!')
            return res.json({
                statusCode: 403,
                mensaje: "Forbidden!"
            })
        }

        res.error404 = () => {
            Winston.ERROR(logErrorMessage + '404: Not found!')
            return res.json({
                statusCode: 404,
                message: "Not found!"
            })
        }

        res.error500 = (error) => {
            Winston.ERROR(logErrorMessage + error)
            return res.json({
                statusCode: 500,
                message: error.message
            })
        }

        res.errorLog = (message) => {
            return res.json({
                statusCode: 500,
                message
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

                    user?.password && delete user.password
                    request.user = user
                    return next()
                }
                else{
                    return response.error403()
                }
            }
            else{
                return response.error401()
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