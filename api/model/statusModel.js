var mongoose=require("mongoose");

var schema=mongoose.Schema;

var frameSchema = new schema({
    date:String,
    infoStatus:String,
    feeling:String,
    image: [String]
});

module.exports=frameSchema;