var express = require('express');
var router = express.Router();
var chats = require('./chats');
var messages = require('./messages');

var checkLoggedIn = function(wrapped) {
    return function (req, res, next) {
        if (req.username) {
            wrapped(req, res, next);
        } else {
            next();
        }
    };
};

router.get('/', checkLoggedIn(chats.page));

router.get('/chats', checkLoggedIn(chats.getChats));

router.post('/chats', checkLoggedIn(chats.postChat));
    
router.get('/chats/:id', checkLoggedIn(messages.page));

router.get('/chats/:id/messages', checkLoggedIn(messages.getMessages));

router.post('/chats/:id/messages', checkLoggedIn(messages.postMessage));

module.exports = router;
