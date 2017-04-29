var status = require("./statusModel");
var mongoose=require("mongoose");

var schema=mongoose.Schema;

var frameSchema = new schema({
    phone:String,
    myinfoStatus:[status]
});

var myStatus = mongoose.model("MyStatus",frameSchema);

module.exports=myStatus;