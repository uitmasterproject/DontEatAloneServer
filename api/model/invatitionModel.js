var mongoose = require('mongoose');

var schema = mongoose.Schema;

var frameSchema = new schema({
    userSend: String,
    nameSend:String,
    timeSend:String,
    date: String,
    time: String,
    place: String,
    status: String,
    read:String,
    seen:String
});
module.exports = frameSchema;