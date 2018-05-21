const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    name: String,
    description: { type: String, default: '' },
    category: { type: Schema.Types.ObjectId, ref: 'TaskCategory' },
    total: Number,
    logs: [{ type: Schema.Types.ObjectId, ref: 'TaskLog' }]
}, { versionKey: false });

mongoose.model('tasks', taskSchema);