import { Router } from 'express'
import cartsManager from '../../data/mongo/managers/cartsManager.js'
import isOnline from '../../middlewares/isOnline.js'

const cartsRouter = Router()

cartsRouter.get('/', isOnline, async (request, response, next) => {

    const user = request.session
    const { user_id } = request.session 

    try {
        const userCarts = await cartsManager.read({user_id})        
        return response.render('carts', {user, userCarts})
    } catch (error) {
        next(error)
    }

})

export default cartsRouter