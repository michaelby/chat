var models = require('../models');

// Hard-coded for now:
var username = 'alice';

module.exports.page = function(req, res, next) {
    res.render('chats', { title: 'Index' });
};

module.exports.getChats = function(req, res, next) {
    var query = models.Chat.find();
    if (req.query.search) {
        query = query.elemMatch('messages', { text: {
            $regex: req.query.search,
            $options: 'i' // Case-insensitive
        }});
    }
    query.exec(function (err, chats) {
        if (err) {
            return next(err);
        }

        var response = [];
        var date;
        for (var i = 0; i < chats.length; i++) {
            var numMessages = chats[i].messages.length;

            date = undefined;
            if (numMessages !== 0) {
                date = chats[i].messages[numMessages-1].date;
            }

            var viewed = chats[i].messagesViewed;
            var read = viewed && viewed[username]
            if (read === undefined) {
                read = 0;
            }

            response.push({
                url: '/chats/' + chats[i]._id,
                topic: chats[i].topic,
                startedBy: chats[i].startedBy,
                lastMessageDate: date,
                messages: numMessages,
                unread: numMessages - read
            });
        }

        res.json(response);
    });
};

module.exports.postChat = function(req, res, next) {
    var chat = new models.Chat({
        topic: req.body.topic,
        startedBy: username,
        messagesViewed: {},
        messages: []
    });
    
    var error;
    chat.save(function (err) {
        error = err;
    });

    if (error) {
        return next(error);
    }

    res.redirect('/chats/' + chat._id);
};
