var mongoose=require("mongoose");

var schema=mongoose.Schema;

var frameSchema = new schema({
    name:String,
    address:String,
    latlng:String,
    openDay:String
});

var restaurant = mongoose.model("restaurants",frameSchema);

module.exports=restaurant;