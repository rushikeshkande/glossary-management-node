import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: String,
    size: String,
    color: String,
    price: Number,
    quantity: Number,
    discount: Number,
    productImage: String
})