var mongoose = require('mongoose');
var inva=require("./invatitionModel");

var schema = mongoose.Schema;

var frameSchema = new schema({
    userRecevice: String,
    invatitions: [inva]
});

var invatition = mongoose.model("Invatition", frameSchema);
module.exports = invatition;