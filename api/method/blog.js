var StatusModel=require("../model/statusModel");

module.exports.addStatus=function(infoStatus, callback){
    StatusModel.create(infoStatus, function(err,data){
        if (data.length != 0) {
            callback({ "status": "Insert success" });
        }
        else {
            callback({ "status": "Insert fail" });
        }
    });
};

module.exports.getAllStatus=function(callback){
    StatusModel.find(function(err,data){
        if(data.length!=0){
            console.log(data);
            callback(data);
        }
    });
};