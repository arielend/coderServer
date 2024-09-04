import { readOneService } from '../services/products.service.js'

async function CheckBuyingRestrictions ( request, _response, next ) {
    try {
        
        const { _id, role } = request.user
        const { product_id } = request.body
        const one = await readOneService(product_id)

        if(role == 'admin') {
            const error = new Error('Admin users cant buy products at the store!')
            error.statusCode = 403
            throw error
        }

        if(_id.toString() == one.supplier_id._id.toString()){
            const error = new Error('It is not possible to add your own product to the cart!')
            error.statusCode = 403
            throw error
        }        
        return next()
    } catch (error) {
        return next(error)
    }
}

export default CheckBuyingRestrictions