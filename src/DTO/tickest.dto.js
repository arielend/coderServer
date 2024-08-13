import argsUtil from '../utils/args.util.js'
import crypto from 'crypto'

const persistence = argsUtil.pers

class TicketsDTO {

    constructor (data) {

        if(persistence !== mongo) {
            this._id = crypto.randomBytes(12).toString('hex')
            this.createdAt = new Date()
            this.updatedAt = new Date() 
        }
        this.user_id = data.user_id
        this.date = data.date || new Date()
        this.total = data.total
        this.products = data.product || []
        this.ticket_status = data.ticket_status || 'created'
    }
}

export default TicketsDTO