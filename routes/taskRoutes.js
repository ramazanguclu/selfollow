const mongoose = require('mongoose');
const Task = mongoose.model('tasks');
const TaskCategory = mongoose.model('taskCategories');
const TaskLog = mongoose.model('taskLogs');

const requireLogin = require('../middlewares/requirelogin');

module.exports = app => {
    //#region TaskCategory

    const getTaskCategories = (id) => {
        console.log(1234);
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

    //region Task

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
        const { name, description, categoryId } = req.body;

        const task = new Task({
            name,
            description,
            _category: categoryId,
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
};

