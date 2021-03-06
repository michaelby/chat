var models = require('../models');

var findChatHandleErrors = function (req, next, callback) {
    models.Chat.findById(req.params.id, function (err, chat) {
        if (err) {
            next(err);
        } else {
            if (chat === null) {
                var err = new Error('Chat Not Found');
                err.status = 404;
                next(err);
            } else {
                callback(chat);
            }
        }
    });
};

module.exports.page = function (req, res, next) {
    findChatHandleErrors(req, next, function (chat) {
        res.render('messages', { title: chat.topic, username: req.username });
    });
};

module.exports.getMessages = function (req, res, next) {
    findChatHandleErrors(req, next, function (chat) {
        var userViewed = {};
        userViewed['messagesViewed.' + req.username] = chat.messages.length;

        chat.update({ $set: userViewed },
                function (err) {
                    if (err) {
                        next(err);
                    } else {
                        res.json(chat.messages);
                    }
                });
    });
};

module.exports.postMessage = function (req, res, next) {
    var message = new models.Message({
        author: req.username,
        text: req.body.text,
        date: new Date()
    });

    findChatHandleErrors(req, next, function (chat) {
        chat.update({ $push: { messages: message }}, function (err, raw) {
            if (err) {
                next(err);
            } else {
                res.status(201).send();
            }
        });
    });
};
