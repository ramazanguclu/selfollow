const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskCategorySchema = new Schema({
    name: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date
}, { versionKey: false });

mongoose.model('taskCategories', taskCategorySchema);