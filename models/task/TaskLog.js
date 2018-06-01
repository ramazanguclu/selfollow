const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskLogSchema = new Schema({
    start: { type: Number, default: 0 },
    end: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    state: { type: String, default: 'end' },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _task: { type: Schema.Types.ObjectId, ref: 'Task' },
    _category: { type: Schema.Types.ObjectId, ref: 'TaskCategory' }
}, { versionKey: false });

mongoose.model('taskLogs', taskLogSchema);