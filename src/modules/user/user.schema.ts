import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    storeName: String,
    email: String,
    contactNo: String,
    username: String,
    password: String,
    profileURL: String,
    GSTNO: String,
    PAN: String,
    userid: Number,
    storeid: Number,
    aadharNo: String
})