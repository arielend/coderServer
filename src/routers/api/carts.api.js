import CustomRouter from '../CustomRouter.js'

import cartsManager from '../../data/mongo/managers/cartsManager.js'
import passport from '../../middlewares/passport.js'
import isAuthenticated from '../../middlewares/isAuthenticated.js'

class CartsRouter extends CustomRouter {

    init() {
        this.paginate('/', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), paginate)
        this.paginate('/:id', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), paginate)
        this.create('/', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), create)
        this.update('/:id', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), update)
        this.destroy('/:id', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), destroy)
        this.destroyMany('/', ['ADMIN', 'CUSTOMER'], passport.authenticate('jwt', { session: false }), destroyMany )
    }
}

async function paginate (request, response, next) {

    try {

        const user_id = request.user._id

        const sortAndPaginate = {}
        request.query.limit && (sortAndPaginate.limit = request.query.limit)
        request.query.page && (sortAndPaginate.page = request.query.page)
        request.query.prevPage && (sortAndPaginate.prevPage = request.query.prevPage)
        request.query.nextPage && (sortAndPaginate.nextPage = request.query.nextPage )

        const filter = { user_id }
        
        const result = await cartsManager.paginate({filter, sortAndPaginate})
        const userCarts = result.docs.map( cart => cart.toObject())

        let paginationInfo = {
            page: result.page,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            totalPages: result.totalPages
        }

        if (userCarts.length !== 0) {
            return response.render('carts', {userCarts, paginationInfo})
            // return response.status200(userCarts)
        }
        else{
            return response.status404()
        }

        //return response.paginate(userCarts, paginationInfo)

    } catch (error) {
        return next(error)
    }
}

async function readOne ( request, response, next ) {

    try {

        const { id } = request.params

        const foundCart = await cartsManager.readOne(id, next)

        if (foundCart) {
            return response.status200(foundCart)

        } else {
            return response.status404()
        }

    } catch (error) {
        return next(error)
    }
}

async function create (request, response, next) {

    try {

        const data = request.body
        data.user_id = request.user._id
        const cart = await cartsManager.create(data, next)

        if(cart) {
            return response.status201(`Cart created with ID ${cart.id}`)
        }

    } catch (error) {
        return next(error)
    }
}

async function update (request, response, next) {

    try {

        const data = request.body
        const { id } = request.params
        const updatedCart = await cartsManager.update(id, data, next)

        if(updatedCart) {
            return response.status200(updatedCart)
        }        
        
    } catch (error) {
        return next(error)
    }
}

async function destroy (request, response, next) {
    try {

        const { _id } = request.body
        const deletedCart = await cartsManager.destroy({_id})

        if (!deletedCart) {
            return response.status404()
        } else {
            return response.status204(`Cart ID ${_id} succesfully deleted.`)
        }
        
    } catch (error) {
        return next(error)
    }
}

async function destroyMany (request, response, next) {
    try {
        const { _id } = request.user
        const deletedItems = await cartsManager.destroyMany(_id)

        if (!deletedItems) {
            return response.status404()
        } else {
            return response.status204('Cleaning up your cart!')
        }
    
    } catch (error) {
        return next(error)
    }
}

const cartsRouter = new CartsRouter()

export default cartsRouter.getRouter()