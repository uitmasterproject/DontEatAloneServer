var mongoose=require("mongoose");

var schema=mongoose.Schema;

var frameSchema = new schema({
    Phone:String,
    FullName:String,
    Password:String,
    Avatar:String,
    Birthday:String,
    Gender:String,
    Address:String,
    Hobby:String,
    Character:String
});

var user = mongoose.model("User",frameSchema);

module.exports=user;