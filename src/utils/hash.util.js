import bcrypt from 'bcryptjs'

const createHash = (passwword) => {
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(passwword, salt)
    return hashPassword
}

const verifyHash = (requestBodyPass, mongoPass) => {
    const verify = bcrypt.compareSync(requestBodyPass, mongoPass)
    return verify
}

export { createHash, verifyHash }