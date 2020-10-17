import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    contactNo: { type: Number },
    profile: { type: String, default: null }
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
