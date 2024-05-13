import { Router } from 'express'
import { Types } from 'mongoose'
import productsManager from '../../data/mongo/managers/productsManager.js'

const homeRouter = Router()

homeRouter.get('/', async (_request, response, next) => {

    // Obtener el dato de la sesion
    let user = {
        _id: new Types.ObjectId('662ff23998461b4dd2ff1190')
    }

    try {
        if(user) {

            const filter = {}
            const sortAndPaginate = { limit: 6 }

            const result = await productsManager.paginate({filter, sortAndPaginate})
            let products = result.docs.map( product => product.toObject())

            const pagination = {
                page: result.page,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                totalPages: result.totalPages
            }

            return response.render('index', {layout: 'main', title: 'CoderServer | Home ', products, pagination, user})
        }
        else {            
            return response.render('login', {layout: 'loginLayout', title: 'CoderServer | Login'})
        }
    } catch (error) {
        next(error)
    }

})

export default homeRouter