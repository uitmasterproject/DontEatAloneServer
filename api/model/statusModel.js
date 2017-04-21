var mongoose=require("mongoose");

var schema=mongoose.Schema;

var frameSchema = new schema({
    date:String,
    infoStatus:String,
    feeling:String,
    image: Array
});

var status = mongoose.model("Status",frameSchema);

module.exports=status;