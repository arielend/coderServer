import { connect } from 'mongoose'
import environment from './env.util.js'

const dbConnect = async () => {
    try {
        await connect(environment.MONGO_URI)        
    } catch (error) {
        throw error
    }
}

export default dbConnect