import { Schema, model, Types } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'products'

const schema = new Schema({

    title: { type: String, required: true, index: true },
    category: { type: String, index: true },
    photo: { type: String },    
    description: { type: String },
    rating: { type: Number, enum:[ 0, 1, 2, 3, 4, 5 ] },
    price: { type: Number },
    stock: { type: Number }

},{
    timestamps: true   
})

schema.plugin(mongoosePaginate)

const ProductModel = model(collection, schema)

export default ProductModel