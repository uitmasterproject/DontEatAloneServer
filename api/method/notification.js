var inforNotification = require("../model/myInvatitionModel");

module.exports.getInfoNotification = function (phone, callback) {
    inforNotification.findOne({ userRecevice: phone }, function (err, data) {
        if (data != null) {
            console.log("Notification" + data.invatitions);
            callback(data.invatitions)
        }
    })
}

module.exports.updateReadNotification = function (phoneRecevice, _phoneSend, _status, _timeSend) {
    console.log(phoneRecevice);
    console.log(_phoneSend);
    console.log('\"' + _timeSend + '\"');
    console.log(_status);
    // inforNotification.findOne({ userRecevice: phoneRecevice}, {invatitions: { $elemMatch: { userSend: _phoneSend, status: _status, timeSend: _timeSend } } }, function (err, data) {
    //     console.log(data);
    //     data.update({},{$set:{'invatitions.$.read':"1"}},function(err,result){
    //         console.log(result);
    //     })
    // })
    // inforNotification.findOne({ userRecevice: phoneRecevice, 'invatitions.userSend': "0934", 'invatitions.status': "accept", 'invatitions.timeSend': "17:16:02_28/06/2017"}, function (err, data) {
    //     console.log(data);
    // })
    // inforNotification.update({ userRecevice: phoneRecevice }, { invatitions: { $elemMatch: { phoneSend: _phoneSend, status: _status, timeSend: _timeSend } } }, { $set: { "invatitions.0":{"read": "1" } }},function (err, data) {
    //         console.log(data);
    //         console.log(err);
    //     })

    inforNotification.findOne({ userRecevice: phoneRecevice }, function (err, data) {
        if (data.invatitions.length > 0) {
            var count = 0, index = 0;
            data.invatitions.forEach(function (element) {
                if (element.timeSend === _timeSend && element.userSend === _phoneSend && element.status === _status) {
                    console.log(count);
                    index = count;
                }
                count++;
            }, this);
            console.log(index);
            switch (index) {
                case 0:
                    inforNotification.update({ userRecevice: phoneRecevice }, { $set: { 'invatitions.0.read': "1" } }, function (err, result) {
                        console.log(result);
                    })
                    break;
                case 1:
                    inforNotification.update({ userRecevice: phoneRecevice }, { $set: { 'invatitions.1.read': "1" } }, function (err, result) {
                        console.log(result);
                    })
                    break;
                case 2:
                    inforNotification.update({ userRecevice: phoneRecevice }, { $set: { 'invatitions.2.read': "1" } }, function (err, result) {
                        console.log(result);
                    })
                    break;
                case 3:
                    inforNotification.update({ userRecevice: phoneRecevice }, { $set: { 'invatitions.3.read': "1" } }, function (err, result) {
                        console.log(result);
                    })
                    break;
                case 4:
                    inforNotification.update({ userRecevice: phoneRecevice }, { $set: { 'invatitions.4.read': "1" } }, function (err, result) {
                        console.log(result);
                    })
                    break;
                case 5:
                    inforNotification.update({ userRecevice: phoneRecevice }, { $set: { 'invatitions.5.read': "1" } }, function (err, result) {
                        console.log(result);
                    })
                    break;
                case 6:
                    inforNotification.update({ userRecevice: phoneRecevice }, { $set: { 'invatitions.6.read': "1" } }, function (err, result) {
                        console.log(result);
                    })
                    break;
                case 7:
                    inforNotification.update({ userRecevice: phoneRecevice }, { $set: { 'invatitions.7.read': "1" } }, function (err, result) {
                        console.log(result);
                    })
                    break;
                case 8:
                    inforNotification.update({ userRecevice: phoneRecevice }, { $set: { 'invatitions.8.read': "1" } }, function (err, result) {
                        console.log(result);
                    })
                    break;
                case 9:
                    inforNotification.update({ userRecevice: phoneRecevice }, { $set: { 'invatitions.9.read': "1" } }, function (err, result) {
                        console.log(result);
                    })
                    break;
                default:
                    inforNotification.update({ userRecevice: phoneRecevice }, { $set: { 'invatitions.10.read': "1" } }, function (err, result) {
                        console.log(result);
                    })
                    break;
            }
        }
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