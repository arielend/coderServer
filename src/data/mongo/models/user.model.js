import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'users'

const schema = new Schema({

    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    photo: { type: String, default: '/images/no_profile_photo.svg' },
    role: { type: String, default: 'customer', enum: ['customer', 'admin'], index: true }

},{
    timestamps: true
});

schema.plugin(mongoosePaginate)

const UserModel = model(collection, schema)
export default UserModel