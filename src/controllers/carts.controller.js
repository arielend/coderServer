import { paginateService, readOneService, createService, updateService, destroyService, destroyManyService } from '../services/carts.service.js'

async function paginate (request, response, next) {

    try {

        const user_id = request.user._id

        const sortAndPaginate = {}
        request.query.limit && (sortAndPaginate.limit = request.query.limit)
        request.query.page && (sortAndPaginate.page = request.query.page)
        request.query.prevPage && (sortAndPaginate.prevPage = request.query.prevPage)
        request.query.nextPage && (sortAndPaginate.nextPage = request.query.nextPage )

        const filter = { user_id }
        
        const result = await paginateService({filter, sortAndPaginate})
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

        const foundCart = await readOneService(id, next)

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
        const cart = await createService(data, next)

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
        const updatedCart = await updateService(id, data, next)

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
        const deletedCart = await destroyService({uuser_id: _id})

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
        console.log('Entre al controller de Cart');
        const { _id } = request.user
        const deletedItems = await destroyManyService({user_id: _id})

        if (!deletedItems) {
            return response.status404()
        } else {
            return response.status204('Cleaning up your cart!')
        }
    
    } catch (error) {
        return next(error)
    }
}

export { paginate, readOne, create, update, destroy, destroyMany }