const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
}, { versionKey: false });

mongoose.model('users', userSchema);