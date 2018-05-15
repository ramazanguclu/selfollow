const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordSchema = new Schema({
    word: String,
    synonym: { type: String, default: '' },
    description: String,
    example: { type: String, default: '' },
    dateSent: Date,
    _group: { type: Schema.Types.ObjectId, ref: 'WordGroup' },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('words', wordSchema);