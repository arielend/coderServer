import { Schema, model, Types } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'users'

const schema = new Schema({

    email: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true },
    bio: { type: String },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true},
    verifyCode: { type: String },
    photo: { type: String },
    role: { type: String, enum: ['admin', 'customer', 'prem'], index: true }

},{
    timestamps: true
});

schema.plugin(mongoosePaginate)

const UserModel = model(collection, schema)
export default UserModel