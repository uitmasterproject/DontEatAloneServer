var UserModel=require("../model/userModel");


module.exports.changePassword=function(phone,password,callback){
    UserModel.update({Phone:phone},{Password:password},function(err, data){
        if(data.length!=0){
            callback({ "status": "Update password success" });
        }
        else{
            callback({"status": "Update password fail"})
        }
    })
};

module.exports.checkLogin=function(phone,password,callback){
    UserModel.find({Phone:phone}, function(err,data){
        console.log(phone);
        if(data.length!=0){
            console.log(data[0].Password);
            if(data[0].Password===password){
                callback({"status":"Login success"});
            }
            else{
                callback({"status":"Login fail. Check password again"});
            }
        }
        else{
            callback({"status":"This phone isnt exits"});
        }
    })
};

module.exports.getProfile=function(phone, callback){
    UserModel.find({Phone:phone},function(err,data){
        if(data.length!=0){
            console.log("------------------------------------------------------------");
            console.log(data);
            callback(data[0]);
        }
    
    })
};
