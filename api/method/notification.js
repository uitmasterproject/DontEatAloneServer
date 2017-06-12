var inforNotification = require("../model/myInvatitionModel");

module.exports.getInfoNotification = function (phone, callback) {
    inforNotification.findOne({ userRecevice: phone }, function (err, data) {
        if (data != null) {
            console.log("Notification" + data.invatitions);
            callback(data.invatitions)
        }
    })
}

module.exports.updateReadNotification = function (phoneRecevice, phoneSend, timeSend, status) {
    inforNotification.findOne({ userRecevice: phoneRecevice, userSend: phoneSend, status: status, timeSend: timeSend },function(err,data){
        console.log(data);
    })
    inforNotification.update({ userRecevice: phoneRecevice, userSend: phoneSend, status: status, timeSend: timeSend }, { $set: { "invatitions.$.read": "1" } }, function (err, data) {
    })
}

module.exports.updateSeenNotification = function (phoneRecevice) {
    inforNotification.findOne({ userRecevice: phoneRecevice }, function (err, data) {
        if (data != null) {
            data.invatitions.forEach(function (element) {
                inforNotification.update({ userRecevice: phoneRecevice, userSend: element.userSend, status: element.status, timeSend: element.timeSend }, { $set: { "invatitions.$.seen": 1 } }, function (err, data) {
                })
            }, this);
        }
    })
}