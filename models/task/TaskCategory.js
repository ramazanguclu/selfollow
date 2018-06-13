const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskCategorySchema = new Schema({
    name: String,
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    dateSent: Date,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'tasks' }]
}, { versionKey: false });

mongoose.model('taskCategories', taskCategorySchema);