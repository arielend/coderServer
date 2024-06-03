import { Schema, model, Types } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'tickets'

const schema = new Schema({

    user_id: { type: Types.ObjectId, required: true, index: true, ref: 'users' },
    date: { type: Date, required: true },
    total: { type: Number, required: true },
    products: { type: Array },
    ticket_status: { type: String, default: 'created', required: true, enum: [ 'created', 'payed', 'sent' ], index: true }
},{
    timestamps: true   
})

schema.pre('find', function () {
    this.populate('user_id', 'email -_id')
})

schema.pre('findOne', function () {
    this.populate('user_id', 'email -_id')
})

//plugin para formatear la fecha
schema.virtual('formattedDate').get(function() {
    return this.date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('/');
});

schema.plugin(mongoosePaginate)

const TicketModel = model(collection, schema)

export default TicketModel
