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

module.exports.Message = mongoose.model('Message', messageSchema);
module.exports.Chat = mongoose.model('Chat', chatSchema);
