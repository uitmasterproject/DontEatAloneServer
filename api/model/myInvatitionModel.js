var mongoose = require('mongoose');

var schema = mongoose.Schema;

var frameSchema = new schema({
    userRecevice: String,
    invatitions: [{
        userSend: String,
        nameSend:String,
        timeSend:String,
        date: String,
        time: String,
        place: String,
        status: String,
        read:String,
        seen:String
    }]
});

var invatition = mongoose.model("Invatition", frameSchema);
module.exports = invatition;