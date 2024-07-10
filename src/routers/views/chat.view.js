import isOnline from "../../middlewares/isOnline.js"
import CustomRouter from "../CustomRouter.js"

class ChatRouter extends CustomRouter {

    init() {
        this.read('/', ['PUBLIC'], isOnline, read)
    }
}

async function read (request, response, next) {    
    try {
        const user = request.user
        return response.render('chat', {title: 'Coderserver | Chat', user})        
    } catch (error) {
        next(error)
    }
    
}

const chatRouter = new ChatRouter()
export default chatRouter.getRouter()