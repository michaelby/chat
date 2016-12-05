var models = require('../models');

module.exports.page = function(req, res, next) {
    models.Chat.findById(req.params.id, function(err, chat) {
        if (err) {
            return next(err);
        }

        if (chat === null) {
            res.status(404);
        } else {
            res.render('messages', { title: chat.topic, ngApp: 'message' });
        }
    });
};
