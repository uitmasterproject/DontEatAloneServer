var mongojs=require("mongojs");
var db=mongojs('DontEatAlone',['User']);

module.exports.login=function(phone, password, callback){
    db.User.find();
}