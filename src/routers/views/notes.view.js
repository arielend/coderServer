import { Router } from 'express'

const notesRouter = Router()

notesRouter.get('/', async (request, response, next) => {

    try {
        return response.render('notes')        
    } catch (error) {
        next(error)
    }

})

export default notesRouter