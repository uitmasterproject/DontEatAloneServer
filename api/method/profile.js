var UserModel = require("../model/userModel");
var MyStatusModel = require("../model/myStatusModel");

module.exports.updateProfile = function (phone, which, content, callback) {
    switch (which) {
        case "Avatar":
            UserModel.update({ Phone: phone }, { $set: { Avatar: content } }, function (err, data) {
                if (err === null)
                    callback({ "status": "updateProfile success" });
                else
                    callback({ "status": "updateProfile fail" });
            })
            break;
        case "FullName":
            UserModel.update({ Phone: phone }, { $set: { FullName: content } }, function (err, data) {
                if (err === null)
                    callback({ "status": "updateProfile success" });
                else
                    callback({ "status": "updateProfile fail" });
            })
            break;

        case "Birthday":
            UserModel.update({ Phone: phone }, { $set: { Birthday: content } }, function (err, data) {
                if (err === null)
                    callback({ "status": "updateProfile success" });
                else
                    callback({ "status": "updateProfile fail" });
            })
            break;

        case "Gender":
            UserModel.update({ Phone: phone }, { $set: { Gender: content } }, function (err, data) {
                if (err === null)
                    callback({ "status": "updateProfile success" });
                else
                    callback({ "status": "updateProfile fail" });
            })
            break;

        case "Address":
            UserModel.update({ Phone: phone }, { $set: { Address: content } }, function (err, data) {
                if (err === null)
                    callback({ "status": "updateProfile success" });
                else
                    callback({ "status": "updateProfile fail" });
            })
            break;

        case "LatLngAdress":
            UserModel.update({ Phone: phone }, { $set: { LatLngAdress: content } }, function (err, data) {
                if (err === null)
                    callback({ "status": "updateProfile success" });
                else
                    callback({ "status": "updateProfile fail" });
            })
            break;

        case "Hobby":
            UserModel.update({ Phone: phone }, { $set: { Hobby: content } }, function (err, data) {
                if (err === null)
                    callback({ "status": "updateProfile success" });
                else
                    callback({ "status": "updateProfile fail" });
            })
            break;

        case "Character":
            UserModel.update({ Phone: phone }, { $set: { Character: content } }, function (err, data) {
                if (err === null)
                    callback({ "status": "updateProfile success" });
                else
                    callback({ "status": "updateProfile fail" });
            })
            break;

        default:
            break;
    }


    UserModel.findOne({ Phone: phone }, function (err, data) {
        console.log(data);
    })
};

module.exports.getAllImage = function (phone, callback) {
    var listImage = new Array();
    MyStatusModel.findOne({ phone: phone }, function (err, result) {
        if (result != null) {
            console.log(result);
            result.myinfoStatus.forEach(function (element) {
                if (element.image.length > 0) {
                    element.image.forEach(function (pic) {
                        listImage.push(pic);
                    }, this);
                }
            }, this);
            console.log(listImage.length);
            callback(listImage);
        }
    })
};

module.exports.getPublicBlog = function (phone, limit, callback) {
    var listPublicBlog = new Array();
    MyStatusModel.findOne({ phone: phone }, function (err, result) {
        if (result != null) {
            console.log(result);
            if (limit === "all") {
                result.myinfoStatus.forEach(function (element) {
                    listPublicBlog.push(element);
                }, this);
            }
            else if (limit === "public") {
                result.myinfoStatus.forEach(function (element) {
                    if (element.limit === "public") {
                        listPublicBlog.push(element);
                    }
                }, this);
            }
            console.log(listPublicBlog.length);
            callback(listPublicBlog);
        }
    })
}

