import * as mongoose from 'mongoose';

export const CartSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    productName: {
      default: null,
      type: String,
      required: true
    },
    productImage: {
      default: null,
      type: String,
      required: true
    },
    price: {
      default: 0,
      type: Number,
      required: true
    },
    oldPrice: {
      default: 0,
      type: Number,
      required: true
    },
    discount: {
      default: 0,
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  {
    timestamps: true,
  },
);
