var mongoose=require("mongoose");

var schema=mongoose.Schema;

var frameSchema = new schema({
    title: String,
    date:String,
    infoStatus:String,
    feeling:String,
    image: [String],
    limit:String
});

module.exports=frameSchema;