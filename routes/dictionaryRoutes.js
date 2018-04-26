const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requirelogin');
const WordGroup = mongoose.model('wordGroups');
const Word = mongoose.model('words');

module.exports = (app) => {
    app.post('/api/dictionary/groups', requireLogin, async (req, res) => {
        const { name } = req.body;

        const wordGroup = new WordGroup({
            name,
            dateSent: Date.now(),
            _user: req.user.id
        });

        try {
            await wordGroup.save();

            const groupsRes = await WordGroup.find({ _user: req.user.id }).select({
                __v: false
            });

            res.send(groupsRes);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.get('/api/dictionary/groups', requireLogin, async (req, res) => {
        const groups = await WordGroup.find({ _user: req.user.id }).select({
            __v: false
        });

        res.send(groups);
    });

    //dictionary words create
    app.post('/api/dictionary/words/new', requireLogin, async (req, res) => {
        const { word, synonym, description, example, group_id } = req.body;

        const wordOfGroup = new Word({
            word,
            synonym,
            description,
            example,
            dateSent: Date.now(),
            _group: group_id,
            _user: req.user.id
        });

        try {
            await wordOfGroup.save();

            const words = await Word.find({ _user: req.user.id, _group: req.params.group_id }).select({
                __v: false
            });

            res.send(words);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    //dictionary words list
    app.get('/api/dictionary/words/:groupName/:groupId', requireLogin, async (req, res) => {
        const words = await Word.find({ _user: req.user.id, _group: req.params.groupId }).select({
            __v: false
        });

        res.send(words);
    });

    //dictionary words delete
    app.post('/api/dictionary/words/delete', requireLogin, async (req, res) => {
        const { deleteId, group_id } = req.body;

        try {
            await Word.findByIdAndRemove(deleteId);

            const words = await Word.find({ _user: req.user.id, _group: group_id }).select({
                __v: false
            });

            res.send(words);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    //dictionary words update
    app.post('/api/dictionary/words/update', requireLogin, async (req, res) => {
        const { updateId, group_id } = req.body;

        try {
            //TO-DO
        } catch (err) {
            res.status(422).send(err);
        }
    });
}