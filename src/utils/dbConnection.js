import { connect } from 'mongoose'

const dbConnect = async () => {
    try {
        await connect(process.env.MONGO_URI)
        console.log('Connected to Mongo Database.')
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect