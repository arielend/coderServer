import jwt from 'jsonwebtoken'

const createToken = (data) => {
    const options = { expiresIn: 60 * 60 * 24 }
    const token = jwt.sign(data, process.env.SECRET_JWT, options)
    return token
}

const verifyToken = (token) => {
    const data = jwt.verify(token, process.env.SECRET_JWT)
    return data
}

export { createToken, verifyToken }