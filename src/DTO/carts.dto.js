import argsUtil from '../utils/args.util.js'
import crypto from 'crypto'

const persistence = argsUtil.pers

console.log('La persistencia en carts dto: ', persistence)

class CartsDTO {

    constructor (data) {

        if(persistence !== 'mongo') {
            this._id = crypto.randomBytes(12).toString('hex')
            this.createdAt = new Date()
            this.updatedAt = new Date() 
        }
        
        this.user_id = data.user_id
        this.product_id = data.product_id
        this.product_quantity = data.product_quantity
        this.cart_status = data.cart_status || 'saved'
    }
}

export default CartsDTO