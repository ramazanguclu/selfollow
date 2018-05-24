const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    name: String,
    description: { type: String, default: '' },
    _category: { type: Schema.Types.ObjectId, ref: 'TaskCategory' },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    total: { type: Number, default: 0 },
    logs: [{ type: Schema.Types.ObjectId, ref: 'TaskLog' }]
}, { versionKey: false });

mongoose.model('tasks', taskSchema);