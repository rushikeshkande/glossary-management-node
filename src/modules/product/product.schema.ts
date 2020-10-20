import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: String,
    size: String,
    color: String,
    price: Number,
    quantity: {type: Number, default: 1},
    discount: Number,
    productImage: {type: String, default: null}
})