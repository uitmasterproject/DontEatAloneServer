var mongojs = require('mongojs');
var db=mongojs('DontEatAlone',['User']);

module.exports.checkPhoneRegister=function(phone, callback){
    db.User.find({Phone:phone},function(err,data){
        if(data.length==0){
            callback({"status":"Phone not exits"});
        }
        else{
            callback({"status":"Phone exits"});
        }
    });
}

module.exports.registerUser=function(data,callback){
    db.User.insert(data, function(err,data){
        if(data.length==0){
            callback({"reponse":"Insert fail"});
        }
        else{
            callback({"reponse":"Insert success"});
        }
    });
}

