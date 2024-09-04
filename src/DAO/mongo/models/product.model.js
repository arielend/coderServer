import { Schema, model, Types } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'products'

const schema = new Schema({

    title: { type: String, required: true, index: true },
    category: { type: String, required:true, index: true },
    photo: { type: String },    
    description: { type: String },
    supplier_id: { type: Types.ObjectId, required: true, index: true, ref: 'users'},
    rating: { type: Number, enum:[ 1, 2, 3, 4, 5 ] },
    price: { type: Number },
    stock: { type: Number }

},{
    timestamps: true   
})

schema.pre('find', function () {
    this.populate('supplier_id', '_id')
})

schema.pre('findOne', function () {
    this.populate('supplier_id', '_id')
})

schema.plugin(mongoosePaginate)

const ProductModel = model(collection, schema)

export default ProductModel