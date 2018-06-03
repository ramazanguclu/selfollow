const mongoose = require('mongoose');
const Task = mongoose.model('tasks');
const TaskCategory = mongoose.model('taskCategories');
const TaskLog = mongoose.model('taskLogs');

const requireLogin = require('../middlewares/requirelogin');

module.exports = app => {
    //#region TaskCategory
    const getTaskCategories = (id) => {
        return TaskCategory.find({ _user: id });
    };

    //task category list
    app.get('/api/task/categories', requireLogin, async (req, res) => {
        res.send(await getTaskCategories(req.user.id));
    });

    //task category create
    app.post('/api/task/categories/new', requireLogin, async (req, res) => {
        const { name } = req.body;

        const taskCat = new TaskCategory({
            name,
            dateSent: Date.now(),
            _user: req.user.id
        });

        try {
            await taskCat.save();
            res.send(await getTaskCategories(req.user.id));
        } catch (err) {
            res.status(422);
        }
    });

    //task category delete
    app.post('/api/task/categories/delete', requireLogin, async (req, res) => {
        const { deleteId } = req.body;
    
        try {
            await TaskCategory.findByIdAndRemove(deleteId);
            res.send(await getTaskCategories(req.user.id));
        } catch (err) {
            res.status(422);
        }
    });
    //#endregion

    //#region Task
    const getTaskList = (id) => {
        return Task.find({ _user: id });
    };

    const getTaskByCategory = (userId, catId) => {
        return Task.find({
            '$and': [{
                _user: userId,
                _cattgory: catId
            }]
        });
    };

    const taskById = (id) => {
        return Task.findById(id);
    };

    const updateTaskState = (id, state) => {
        return Task.findByIdAndUpdate(id, {
            state: state
        });
    };

    const updateTotalLog = (id, duration) => {
        return Task.findByIdAndUpdate(id, {
            $inc: { total: duration }
        });
    };

    //task view
    app.get('/api/task/:taskid', async (req, res) => {
        res.send(await taskById(req.params.taskid));
    });

    //task list
    app.get('/api/task_list', requireLogin, async (req, res) => {
        res.send(await getTaskList(req.user.id));
    });

    //task list by category id
    app.get('/api/tasks/:categoryName', async (req, res) => {
        res.send(await getTaskByCategory(req.user.id, req.body.categoryId));
    });

    //task create
    app.post('/api/task/new', requireLogin, async (req, res) => {
        const { name, description, _category } = req.body;

        const task = new Task({
            name,
            description,
            _category,
            _user: req.user.id
        });

        try {
            await task.save();
            res.send(await getTaskList(req.user.id));
        } catch (err) {
            res.status(422);
        }
    });
    //endregion

    //#region TaskLog
    //task log list
    app.get('/api/log/list/:taskid', requireLogin, async (req, res) => {
        res.send(await TaskLog.find({ _task: req.params.taskid }));
    });

    const updateTasklogState = async (taskId, currentState, nextState) => {
        const log = await TaskLog.findOne({
            _task: taskId,
            state: currentState
        });

        const dur = (new Date()).getTime() - log.start;

        try {
            await updateTotalLog(taskId, dur);

            return TaskLog.updateOne(
                {
                    _task: taskId,
                    state: currentState
                },
                {
                    state: nextState,
                    end: (new Date()).getTime(),
                    duration: dur
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    //task log create
    app.post('/api/log/new', requireLogin, async (req, res) => {
        const { _task, _category } = req.body;

        try {
            const { state } = await taskById(_task);

            if (state === 'end') {
                await updateTaskState(_task, 'start');

                const taskLog = await new TaskLog({
                    start: (new Date()).getTime(),
                    state: 'start',
                    _task,
                    _category,
                    _user: req.user._id
                }).save();

                res.send(taskLog);
            } else {
                await updateTaskState(_task, 'end');
                await updateTasklogState(_task, 'start', 'end');

                res.send({ status: 'success' });
            }
        } catch (error) {
            console.log(error);
            res.status(422).send({ status: 'error' });
        }
    });
    //endregion
};