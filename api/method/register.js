var UserModel=require("../model/userModel");


module.exports.registerNewUser = function (userdb, callback) {
    UserModel.create(userdb, function (err, data) {
        if (data.length != 0) {
            callback({ "status": "Insert success" });
        }
        else {
            callback({ "status": "Insert fail" });
        }
    })
};

module.exports.checkPhoneExits = function (phone, callback) {
    UserModel.find({Phone:phone},function(err,data){
        if(data.length!=0){
            callback({"status":"this phone is exits"});
        }
        else{
            callback({"status":"this phone isnt exits"});
        }
    })
};