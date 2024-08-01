import CustomRouter from '../CustomRouter.js'

class NotesRouter extends CustomRouter {

    init() {
        this.read('/', read)
    }
}

async function read (request, response, next) {
    
    try {
        return response.render('notes')        
    } catch (error) {
        next(error)
    }
    
}

const notesRouter = new NotesRouter()
export default notesRouter.getRouter()