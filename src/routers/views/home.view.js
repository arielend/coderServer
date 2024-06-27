import CustomRouter from '../CustomRouter.js'
import { paginate } from '../../controllers/products.controller.js'
import isOnline from '../../middlewares/isOnline.js'

class HomeRouter extends CustomRouter {

    init() {
        this.read('/', ['PUBLIC'], isOnline, async (req, res, next) => {
            const user = req.user
            console.log('user en home: ', user);

            if (user.online) {

                const result = await paginate(req, res, next)


                // let products = result.docs.map(product => product.toObject())
                let products = result.docs               

                const pagination = {
                    page: result.page,
                    prevPage: result.prevPage,
                    nextPage: result.nextPage,
                    totalPages: result.totalPages
                }

                return res.render('index', { layout: 'main', title: 'CoderServer | Home ', products, pagination, user })
            }
            else {
                return res.render('login', { layout: 'loginLayout', title: 'CoderServer | Login' })
            }
        })
    }
}

const homeRouter = new HomeRouter()
export default homeRouter.getRouter()