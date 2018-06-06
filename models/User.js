const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    displayName: { type: String, default: '' }
}, { versionKey: false });

mongoose.model('users', userSchema);