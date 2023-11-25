import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    description: String,
});

export const userModel = mongoose.model('User', userSchema);