const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskLogSchema = new Schema({
    start: { type: Number, default: 0 },
    end: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { versionKey: false });

mongoose.model('taskLogs', taskLogSchema);