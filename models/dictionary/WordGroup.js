const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordGroupSchema = new Schema({
    name: String,
    dateSent: Date,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('wordGroups', wordGroupSchema);