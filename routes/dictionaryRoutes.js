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
            res.send({ status: 'success' });
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

    app.post('/api/dictionary/words/new', requireLogin, async (req, res) => {
        const { word, synonym, description, example, _group } = req.body;

        const wordData = new Word({
            word,
            synonym,
            description,
            example,
            dateSent: Date.now(),
            _group,
            _user: req.user.id
        });

        try {
            await word.save();
            res.send({ status: 'success' });
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.get('/api/dictionary/words/:groupName', requireLogin,async (req, res) => {
        //TO-DO
        const groupId = await WordGroup.find({ _user: req.user.id, name: req.params.groupName }).select({
            __v: false
        });
        
        console.log(groupId, req.params.groupName);
        
        const words = await Word.find({ _user: req.user.id, _group: req.params.groupId }).select({
            __v: false
        });
        
        res.send(words);
    });
}