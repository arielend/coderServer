import argsUtil from '../utils/args.util.js'
import crypto from 'crypto'

const persistence = argsUtil.pers

console.log('La persistencia en users dto: ', persistence)

class UsersDTO {

    constructor(data) {

        if(persistence !== 'mongo'){
            this._id = crypto.randomBytes(12).toString('hex')
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }
        
        this.email = data.email
        this.username = data.username || 'No name'
        this.password = data.password
        this.verified = data.verified || false
        this.verifyCode = data.verifyCode || crypto.randomBytes(12).toString('hex')
        this.role = data.role || 'customer'
        this.bio = data.bio || 'You can write here something interesting about you!'
        this.photo = data.photo || '/images/no_profile_photo.svg'
    }
}

export default UsersDTO