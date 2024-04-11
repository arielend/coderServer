import multer from 'multer'
import __dirname from '../../utils.js'
import crypto from 'crypto'

const storage = multer.diskStorage({
    destination: ( request, file, cb) => cb (null, __dirname + '/public/uploadedImages'),
    //filename: ( request, file, cb) => cb(null, crypto.randomBytes(12).toString('hex')+file.originalname), para nombre semi aleatorio
    filename: ( request, file, cb) => cb(null, file.originalname),
})

const uploader = multer({storage})

export default uploader