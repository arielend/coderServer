import { Router } from 'express'

const chatRouter = Router()

chatRouter.get('/', async (request, response, next) => {

    try {
        const user = request.session
        return response.render('chat', {title: 'Coderserver | Chat', user})        
    } catch (error) {
        next(error)
    }

})

export default chatRouter