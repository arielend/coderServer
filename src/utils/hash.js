import { genSaltSync, compareSync, hashSync  } from 'bcrypt'

const createHash = (passwword) => {
    const salt = genSaltSync(10)
    const hashPassword = hashSync(passwword, salt)
    return hashPassword
}

const verifyHash = (requestBodyPass, mongoPass) => {
    const verify = compareSync(requestBodyPass, mongoPass)
    return verify
}

export { createHash, verifyHash }