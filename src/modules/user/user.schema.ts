import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contactNo: String,
    username: String,
    password: String,
    profileURL: String
})