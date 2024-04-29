import { Schema, model, Types } from 'mongoose'

const collection = 'notes'

const schema = new Schema({
    text: { type: String, required: true },
    category: { type: String, default: 'to do', enum:  ['to do', 'donde'], index: true },
    user_id: { type: Types.ObjectId, required: true, ref: 'users', index: true }
},{
    timestamps: true
})

schema.pre('find', function () {
    this.populate('user_id', 'email -_id')
})

schema.pre('findOne', function () {
    this.populate('user_id', 'email -_id')
})

const NoteModel = model(collection, schema)
export default NoteModel