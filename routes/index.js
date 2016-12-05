var express = require('express');
var router = express.Router();
var chats = require('./chats');
var messages = require('./messages');

router.get('/', chats.page);

router.get('/chats', chats.getChats);

router.post('/chats', chats.postChat);
    
router.get('/chats/:id', messages.page);

//Soon:

//router.get('/chats/:id/messages', messages.getMessages);

//router.get('/chats/:id/messages', messages.postMessage);

module.exports = router;
