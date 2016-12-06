var models = require('../models');

module.exports.page = function (req, res, next) {
    res.render('chats', { title: 'Index', username: req.username });
};

module.exports.getChats = function (req, res, next) {
    var query = models.Chat.find();
    if (req.query.search) {
        query = query.elemMatch('messages', { text: {
            $regex: req.query.search,
            $options: 'i' // Case-insensitive
        }});
    }
    query.exec(function (err, chats) {
        if (err) {
            next(err);
        } else {
            var response = [];
            var date;
            for (var i = 0; i < chats.length; i++) {
                var numMessages = chats[i].messages.length;

                date = undefined;
                if (numMessages !== 0) {
                    date = chats[i].messages[numMessages-1].date;
                }

                var viewed = chats[i].messagesViewed;
                var read = viewed && viewed[req.username];
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
        }
    });
};

module.exports.postChat = function (req, res, next) {
    var chat = new models.Chat({
        topic: req.body.topic,
        startedBy: req.username,
        messagesViewed: {},
        messages: []
    });
    
    chat.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.redirect('/chats/' + chat._id);
        }
    });
};
