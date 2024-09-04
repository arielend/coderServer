import { connect } from 'mongoose'
import environment from './env.util.js'

const dbConnect = async () => {
    try {
        await connect(environment.MONGO_URI, {
            //Eliminar objeto de opciones
            //Solo se configuro para conexiones lentas del telefono
            socketTimeoutMS: 60000,
            serverSelectionTimeoutMS: 60000,
        })        
    } catch (error) {
        throw error
    }
}

export default dbConnect