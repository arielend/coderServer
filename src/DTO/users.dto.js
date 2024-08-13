import argsUtil from '../utils/args.util.js'
import crypto from 'crypto'

const persistence = argsUtil.pers

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
        this.photo = data.photo || 'https://firebasestorage.googleapis.com/v0/b/coderserver-1ccaf.appspot.com/o/icons%2Fno_profile_photo.svg?alt=media&token=3629a314-f68c-4db6-9478-0e8c66f80e44'
    }
}

export default UsersDTO