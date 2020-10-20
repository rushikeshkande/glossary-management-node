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
    price: {
      default: 0,
      type: Number,
    },
    discount: {
      default: 0,
      type: Number
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.'],
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  },
);
