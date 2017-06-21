var UserModel = require("../model/userModel");

module.exports.updateProfile = function (phone, which, content, callback) {
    switch (which) {
        case "Avatar":
            UserModel.update({ Phone: phone }, { $set: { Avatar: content } }, function (err, data) {
                if(err===null)
                    callback({"status":"updateProfile success"});
                else
                    callback({"status":"updateProfile fail"});
            })
            break;
        case "FullName":
            UserModel.update({ Phone: phone }, { $set: { FullName: content } }, function (err, data) {
                if(err===null)
                    callback({"status":"updateProfile success"});
                else
                    callback({"status":"updateProfile fail"});
            })
            break;
        
        case "Birthday":
            UserModel.update({ Phone: phone }, { $set: { Birthday: content } }, function (err, data) {
                if(err===null)
                    callback({"status":"updateProfile success"});
                else
                    callback({"status":"updateProfile fail"});
            })
            break;

        case "Gender":
            UserModel.update({ Phone: phone }, { $set: { Gender: content } }, function (err, data) {
                if(err===null)
                    callback({"status":"updateProfile success"});
                else
                    callback({"status":"updateProfile fail"});
            })
            break;

        case "Address":
            UserModel.update({ Phone: phone }, { $set: { Address: content } }, function (err, data) {
                if(err===null)
                    callback({"status":"updateProfile success"});
                else
                    callback({"status":"updateProfile fail"});
            })
            break;

        case "LatLngAdress":
            UserModel.update({ Phone: phone }, { $set: { LatLngAdress: content } }, function (err, data) {
                if(err===null)
                    callback({"status":"updateProfile success"});
                else
                    callback({"status":"updateProfile fail"});
            })
            break;

        case "Hobby":
            UserModel.update({ Phone: phone }, { $set: { Hobby: content } }, function (err, data) {
                if(err===null)
                    callback({"status":"updateProfile success"});
                else
                    callback({"status":"updateProfile fail"});
            })
            break;

        case "Character":
             UserModel.update({ Phone: phone }, { $set: { Character: content } }, function (err, data) {
                if(err===null)
                    callback({"status":"updateProfile success"});
                else
                    callback({"status":"updateProfile fail"});
            })
            break;

        default:
            break;
    }


    UserModel.findOne({ Phone: phone }, function (err, data) {
        console.log(data);
    })
};

