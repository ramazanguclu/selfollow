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
            await Task.remove({ _category: deleteId });
            await TaskLog.remove({ _category: deleteId });

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
                _category: catId
            }]
        });
    };

    const taskById = (id) => {
        return Task.findById(id);
    };

    const updateTaskFavorite = (id, type) => {
        return Task.findByIdAndUpdate(id, {
            isFavorite: type === 'add' ? true : false
        });
    };

    const updateTaskState = (id, state, time) => {
        return Task.findByIdAndUpdate(id, {
            state: state,
            startDate: time
        });
    };

    const updateTotalLog = (id, duration) => {
        return Task.findByIdAndUpdate(id, {
            $inc: { total: duration }
        });
    };

    //task delete
    app.post('/api/task/delete', async (req, res) => {
        const { _task } = req.body;

        try {
            await Task.findByIdAndRemove(_task);
            await TaskLog.remove({ _task });

            res.send(await getTaskCategories(req.user.id));
        } catch (error) {
            console.log(error);
            res.status(422).send(error);
        }
    });

    //task favorite
    app.post('/api/task/favorite/:type/:taskid', async (req, res) => {
        try {
            await updateTaskFavorite(req.params.taskid, req.params.type);
            res.send(await taskById(req.params.taskid));
        } catch (error) {
            console.log(error);
            res.status(422).send({ status: 'error' });
        }

    });

    //task favarites list
    app.get('/api/tasks/favorites', async (req, res) => {
        const listFav = await Task.find({
            _user: req.user._id,
            isFavorite: true
        });

        res.send(listFav);
    });

    //task view
    app.get('/api/task/:taskid', async (req, res) => {
        res.send(await taskById(req.params.taskid));
    });

    //task list
    app.get('/api/task_list', requireLogin, async (req, res) => {
        res.send(await getTaskList(req.user.id));
    });

    //task list by category id
    app.get('/api/tasks/category/:categoryId', async (req, res) => {
        res.send(await getTaskByCategory(req.user.id, req.params.categoryId));
    });

    //task create
    app.post('/api/task/new', requireLogin, async (req, res) => {
        const { name, description, _category, isFavorite = false } = req.body;

        const task = new Task({
            name,
            description,
            _category,
            isFavorite,
            _user: req.user.id
        });

        try {
            const createdTask = await task.save();
            const list = await getTaskList(req.user.id);
            
            res.send({createdTask, list});
        } catch (err) {
            res.status(422);
        }
    });
    //endregion

    //#region TaskLog
    //task log working
    app.get('/api/log/working', requireLogin, async (req, res) => {
        const log = await TaskLog.find({
            _user: req.user._id,
            state: 'start'
        }).populate('_task');

        res.send(log);
    });

    const detectSkip = (itemPerPage, pageNumber) => {
        return itemPerPage * (pageNumber - 1);
    };

    const logListWithTask = (_task, itemPerPage, pageNumber) => {
        itemPerPage = Math.abs(itemPerPage) || 10;
        pageNumber = Math.abs(pageNumber) || 1;

        return TaskLog.
            find({ _task }).
            sort({ _id: -1 }).
            skip(detectSkip(itemPerPage, pageNumber)).
            limit(itemPerPage).
            populate('_task');
    };

    //task log list
    app.get('/api/log/list/:_task/:itemPerPage/:pageNumber', requireLogin, async (req, res) => {
        const { _task, itemPerPage, pageNumber } = req.params;

        res.send({
            data: await logListWithTask(_task, itemPerPage, pageNumber),
            count: await TaskLog.count({ _task })
        });
    });

    //task log update
    const updateTasklogState = async (taskId, currentState, nextState) => {
        const log = await TaskLog.findOne({
            _task: taskId,
            state: currentState
        });

        const dur = new Date() - log.startDate;

        try {
            await updateTotalLog(taskId, dur);

            return TaskLog.updateOne(
                {
                    _task: taskId,
                    state: currentState
                },
                {
                    state: nextState,
                    endDate: new Date(),
                    duration: dur
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const logResponse = async ({ _user, _task, _category, _type, itemPerPage, pageNumber }) => {
        const isSingleTask = _type === 'singleTask';

        return isSingleTask
            ? {
                data: await logListWithTask(_task, itemPerPage, pageNumber),
                count: await TaskLog.count({ _task })
            }
            : getTaskByCategory(_user, _category);
    };

    //task log create
    app.post('/api/log/new', requireLogin, async (req, res) => {
        const { _task, _category, _type, itemPerPage, pageNumber } = req.body;
        const _user = req.user._id;

        try {
            const { state } = await taskById(_task);

            if (state === 'end') {
                await updateTaskState(_task, 'start', new Date());

                await new TaskLog({
                    startDate: new Date(),
                    state: 'start',
                    _task,
                    _category,
                    _user
                }).save();
            }
            else {
                await updateTaskState(_task, 'end', null);
                await updateTasklogState(_task, 'start', 'end');
            }

            res.send(await logResponse({ _user, _task, _category, _type, itemPerPage, pageNumber }));

        } catch (error) {
            console.log(error);
            res.status(422).send(error);
        }
    });

    app.get('/api/log/statistic', async (req, res) => {
        let data = [];
        let count = 0;
        let { _task, _category } = req.query;
        const { _type, itemPerPage, pageNumber } = req.query;

        if (_task) _task = mongoose.Types.ObjectId(_task);
        else if (_category) _category = mongoose.Types.ObjectId(_category);

        if (_category || _task) {
            data = await TaskLog.aggregate([
                {
                    $match: {
                        _user: req.user._id,
                        $or: [
                            { _task },
                            { _category }
                        ]
                    }
                },
                {
                    $group: {
                        _id:
                        {
                            $switch:
                            {
                                branches: [
                                    {
                                        case: _type === 'monthly',
                                        then: {
                                            month: { $month: '$startDate' },
                                            year: { $year: '$startDate' }
                                        }
                                    },
                                    {
                                        case: _type === 'yearly',
                                        then: {
                                            year: { $year: '$startDate' }
                                        }
                                    }
                                ],
                                default: {
                                    day: { $dayOfMonth: '$startDate' },
                                    month: { $month: '$startDate' },
                                    year: { $year: '$startDate' }
                                }
                            }
                        },
                        total: { $sum: '$duration' },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 }
                }
            ]);

            const skip = detectSkip(itemPerPage, pageNumber);
            count = data.length;

            data = data.slice(skip, skip + Number(itemPerPage));
        }

        res.send({ data, count });
    });
    //endregion
};