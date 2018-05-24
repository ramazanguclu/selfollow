const mongoose = require('mongoose');
const WordGroup = mongoose.model('wordGroups');
const Word = mongoose.model('words');

const requireLogin = require('../middlewares/requirelogin');

module.exports = app => {
    //#region WordGroup

    const getWordGroupList = (id) => {
        return WordGroup.find({ _user: id });
    };

    //dictionary group create
    app.post('/api/dictionary/groups', requireLogin, async (req, res) => {
        const { name } = req.body;

        const wordGroup = new WordGroup({
            name,
            dateSent: Date.now(),
            _user: req.user.id
        });

        try {
            await wordGroup.save();
            res.send(await getWordGroupList(req.user.id));
        } catch (err) {
            res.status(422).send(err);
        }
    });

    //dictionary group list
    app.get('/api/dictionary/groups', requireLogin, async (req, res) => {
        res.send(await getWordGroupList(req.user.id));
    });

    //dictionary group delete
    app.post('/api/dictionary/groups/delete', requireLogin, async (req, res) => {
        const { delete_id } = req.body;

        try {
            await WordGroup.findByIdAndRemove(delete_id);
            res.send(await getWordGroupList(req.user.id));
        } catch (err) {
            res.status(422).send(err);
        }
    });

    //#endregion

    //#region Word
    
    const wordList = (id) => {
        return Word.find({ _user: id });
    };

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
            res.send(await wordList(req.user.id));
        } catch (err) {
            res.status(422).send(err);
        }
    });

    //dictionary words list
    app.get('/api/dictionary/words/:groupName/:groupId', requireLogin, async (req, res) => {
        res.send(await wordList(req.user.id));
    });

    //dictionary words delete
    app.post('/api/dictionary/words/delete', requireLogin, async (req, res) => {
        const { deleteId, group_id } = req.body;

        try {
            await Word.findByIdAndRemove(deleteId);
            res.send(await wordList(req.user.id));
        } catch (err) {
            res.status(422).send(err);
        }
    });

    //dictionary words update
    app.post('/api/dictionary/words/update', requireLogin, async (req, res) => {
        const { word_id, group_id, word, synonym, description, example } = req.body;

        try {
            await Word.findByIdAndUpdate(word_id, {
                word,
                synonym,
                description,
                example,
                dateSent: Date.now(),
                _group: group_id,
                _user: req.user.id
            });

            res.send(await wordList(req.user.id));
        } catch (err) {
            res.status(422).send(err);
        }
    });

    //#endregion
};