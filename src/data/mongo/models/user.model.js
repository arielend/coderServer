import { Schema, model } from 'mongoose'

const collection = 'users'

const schema = new Schema({

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: '/images/no_profile_photo.svg' },
    rol: { type: String, default: 'customer', enum: ['customer', 'admin'] }

},{
    timestamps: true   
})

const UserModel = model(collection, schema)

export default UserModel