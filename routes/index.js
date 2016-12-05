var express = require('express');
var router = express.Router();
var models = require('../models');
var chats = require('./chats');

/* GET home page. */
router.get('/', chats.index);

router.get('/chats', chats.getChats);

router.post('/chats', chats.postChat);
    
module.exports = router;
