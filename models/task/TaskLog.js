const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskLogSchema = new Schema({
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    duration: { type: Number, default: 0 },
    state: { type: String, default: 'end' },
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    _task: { type: Schema.Types.ObjectId, ref: 'tasks' },
    _category: { type: Schema.Types.ObjectId, ref: 'taskCategories' }
}, { versionKey: false });

mongoose.model('taskLogs', taskLogSchema);