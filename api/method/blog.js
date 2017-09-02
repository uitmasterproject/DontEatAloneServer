var MyStatusModel = require("../model/myStatusModel");
var StatusModel = require("../model/statusModel");

module.exports.addStatus = function (phone, infoStatus, callback) {

    var myInfoStatus = {
        "phone": phone,
        "myinfoStatus": infoStatus
    };

    MyStatusModel.findOneAndUpdate({ phone: phone }, { $push: { myinfoStatus: infoStatus } }, { safe: true, upsert: true, new: true }, function (err, data) {

        if (err == null) {
            callback({ "status": "Insert success" });
        }
        else {
            callback({ "status": "Insert fail" });
        }
    });
};

module.exports.getAllStatus = function (phone, callback) {
    MyStatusModel.find({ phone: phone }, function (err, data) {
        console.log(data);
        if (data != null) {
            callback(data[0].myinfoStatus);
        }
    });
};

module.exports.deleteStatusBlog = function (phone, date, callback) {
    MyStatusModel.update(
        { phone: phone },
        { $pull: { "myinfoStatus": { date: date } } },
        function (err, data) {
            if (err == null) {
                callback({ "status": "Delete success" });
            }
            else {
                callback({ "status": "Delete fail" });
            }
        }
    );
};

module.exports.editStatusBlog = function (phone, infoStatus, callback) {
    MyStatusModel.update({ phone: phone, "myinfoStatus.date": infoStatus.date },
        {
            $set: {
                "myinfoStatus.$.title": infoStatus.title,
                "myinfoStatus.$.infoStatus": infoStatus.infoStatus,
                "myinfoStatus.$.feeling": infoStatus.feeling,
                "myinfoStatus.$.image": infoStatus.image,
                "myinfoStatus.$.limit": infoStatus.limit
            }
        },
        function (err, data) {
            if (err == null) {
                callback({ "status": "Insert success" });
            }
            else {
                callback({ "status": "Insert fail" });
            }
        });
}
