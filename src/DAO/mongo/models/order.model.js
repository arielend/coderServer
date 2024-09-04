import { Schema, model, Types } from 'mongoose'

const collection = 'orders'

const schema = new Schema({
    user_id: { type: Types.ObjectId, required: true, index: true, ref: 'users' },
    session_id: { type: String, required: true, index:true },
    order_status: { type: String, default: 'created' }
},{
    timestamps: true   
})

schema.pre('find', function () {
    this.populate('user_id', 'email -_id')
})

schema.pre('findOne', function () {
    this.populate('user_id', 'email -_id')
})

const OrderModel = model(collection, schema)
export default OrderModel