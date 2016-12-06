var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    author: String,
    date: Date,
    text: String
});

var chatSchema = new mongoose.Schema({
    topic: String,
    startedBy: String,
    messagesViewed: mongoose.Schema.Types.Mixed,
    messages: [messageSchema]
});

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

var sessionSchema = new mongoose.Schema({
    username: String,
});

module.exports = {
    Message: mongoose.model('Message', messageSchema),
    Chat: mongoose.model('Chat', chatSchema),
    User: mongoose.model('User', userSchema),
    Session: mongoose.model('Session', sessionSchema)
};
