import argsUtil from '../utils/args.util.js'
import crypto from 'crypto'

const persistence = argsUtil.pers


class ProductsDTO {

    constructor (data) {

        if(persistence !== 'mongo') {
            this._id = crypto.randomBytes(12).toString('hex')
            this.createdAt = new Date()
            this.updatedAt = new Date() 
        }
        
        this.title = data.title
        this.photo = data.photo || 'https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/images%2Fno_photo.svg?alt=media&token=47b00a66-1149-4a27-9e1e-97ccbcef838b'
        this.category = data.category || 'technology'
        this.rate = data.rate || 5
        this.price = data.price || 1
        this.stock = data.stock || 1
    }
}

export default ProductsDTO