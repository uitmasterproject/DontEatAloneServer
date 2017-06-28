var inforUser = require("../model/userModel");
var infoInvatition = require("../model/myInvatitionModel");

var userOnline = new Array();
module.exports = function (io) {
    io.sockets.on('connection', function (socket) {
        socket.on("UserOnline", function (data) {
            var check = 0;
            console.log(data);
            var temp = data.split("|");
            socket.id = temp[0];
            console.log("id:" + socket.id);
            var require = {
                "gender": temp[1],
                "agemin": parseInt(temp[2]),
                "agemax": parseInt(temp[3]),
                "address": temp[4],
                "latlng": temp[5],
                "hobbyfood": temp[6].split(","),
                "hobbycharacter": temp[7].split(","),
                "hobbystyle": temp[8].split(",")
            }
            userOnline.forEach(function (element) {
                if (element.phone === temp[0]) {
                    check = 1;
                    element.inforRequire = require;
                }
                console.log(element.phone + "-------------------------------------------------------------");
            }, this);
            console.log("++++++++++++++++++++++++++++++++++++++++" + check);
            if (check === 0) {
                var requireUser = {
                    "phone": temp[0],
                    "inforRequire": require
                }
                userOnline.push(requireUser);
            }
            var today = new Date().getFullYear();
            var userLike = new Array();
            var countlength = 0;
            userOnline.forEach(function (element) {
                var countsame = 0;
                var fail = true;
                if (element.phone !== socket.id) {
                    inforUser.findOne({ Phone: element.phone }, function (err, result) {
                        countlength += 1;
                        if (result != null) {
                            if (element.gender !== require.gender && require.gender !== "all") {
                                fail = false;
                            }
                            var ageElement = today - parseInt(result.Birthday.split("/")[2]);
                            if (ageElement < require.agemin || ageElement > require.agemax) {
                                fail = false;
                            }
                            var latDistance = (element.inforRequire.latlng.split(",")[0] - require.latlng.split(",")[0]) * Math.PI / 180;
                            var lngDistance = (element.inforRequire.latlng.split(",")[1] - require.latlng.split(",")[1]) * Math.PI / 180;
                            var a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                                + Math.cos((element.inforRequire.latlng.split(",")[0]) * Math.PI / 180) * Math.cos((require.latlng.split(",")[0]) * Math.PI / 180)
                                * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
                            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                            var distance = (Math.round(6371 * c));
                            if (distance > 5) {
                                fail = false;
                            }
                            else if (distance <= 2) {
                                countsame += 3;
                            }
                            else if (distance > 2 && distance <= 4) {
                                countsame += 2;
                            }
                            else if (distance > 4 && distance <= 5) {
                                countsame += 1;
                            }

                            if (fail == true) {
                                temp[7].split(",").forEach(function (ele) {
                                    if (result.Character.indexOf(ele) != -1)
                                        countsame += 1;
                                }, this);
                                temp[8].split(",").forEach(function (ele) {
                                    if (result.Character.indexOf(ele) != -1)
                                        countsame += 1;
                                }, this);
                                var item = {
                                    "accordantUser": element.phone,
                                    "avatar": result.Avatar,
                                    "fullName": result.FullName,
                                    "percent": countsame,
                                    "gender": result.Gender,
                                    "age": ageElement,
                                    "address": result.Address,
                                    "latlng": element.inforRequire.latlng,
                                    "character": result.Character
                                }
                                userLike.push(item);
                                console.log("--------------------------------------" + userLike.length);
                            }
                        }
                        if (countlength === (userOnline.length - 1)) {
                            socket.emit("userLike", {
                                "listUserLike": userLike
                            })
                        }
                    });

                }
            }, this);
        })

        socket.on('invite', function (data) {
            var temp = data.split("|");
            inforUser.findOne({ Phone: socket.id }, function (err, result) {
                if (result != null) {

                    //infor inviter
                    var itemInvitation = {
                        "phoneInviter": socket.id,
                        "avatar": result.Avatar,
                        "fullName": result.FullName,
                        "age": new Date().getFullYear() - parseInt(result.Birthday.split("/")[2]),
                        "gender": result.Gender,
                        "date": temp[2],
                        "timer": temp[3],
                        "place": temp[4],
                        "timeSend": temp[5],
                        "character": result.Character
                    }
                    socket.broadcast.emit("sendInvite", {
                        "phoneInvited": temp[1], // phone of invited
                        "invitation": itemInvitation
                    });
                }
            })
        });


        //0 phoneInviter
        //1 fullName
        //2 phoneInvited
        //3 nameInvited
        //4 timeSend
        //5 date
        //6 timer
        //7 place
        //8 result
        socket.on('reponseInvitation', function (data) {//phoneReceiver is phone Send this message

            var temp = data.split("|");
            console.log("user off");
            //check inviter Online or Offline
            var check = 0;
            userOnline.forEach(function (element) {
                if (element.phone === temp[0])
                    check = 1;
            }, this);

            //check=0 => inviter dont have in list UserOnline => this inviter Offline
            if (check == 0) {
                console.log("user off");
                socket.emit('userInviteOff', {
                    "phoneReceiver": temp[0],
                    "nameReceiver": temp[1]
                });
            }
            // else => this inviter is Online
            else {
                if (temp[8] === "refuse") {
                    socket.broadcast.emit("resultInvitation", {
                        "phoneReceiver": temp[0],
                        "result": {
                            "phoneSend": temp[2],
                            "nameSend": temp[3],
                            "resultInvite": "refuse"
                        }
                    });
                    updateStatusInvitation(temp, "1");
                }
                else if (temp[8] === "accept") {
                    console.log(temp);
                    socket.broadcast.emit("resultInvitation", {
                        "phoneReceiver": temp[0],
                        "result": {
                            "phoneSend": temp[2],
                            "nameSend": temp[3],
                            "resultInvite": "success"
                        }
                    });
                    updateStatusInvitation(temp, "1");
                }
                else {
                    updateStatusInvitation(temp, "-1");
                }
            }
        });

        socket.on('disconnect', function () {
            var count = 0;
            userOnline.forEach(function (element) {
                console.log(socket.id);
                console.log(element.phone);
                if (element.phone === socket.id) {
                    userOnline.splice(count, 1)
                }
                count += 1;
            }, this);
            console.log(userOnline.length);
        })
    });

    var updateStatusInvitation = function (temp, check) {
        // infoInvatition.update({userRecevice:phoneRe,timeSend:timeSe},{$set:{"invatitions.$.status":sta}},function(err,data){
        //     if(err==null){
        //         callback({"status":"Update success"});
        //     }
        //     else{
        //         callback({"status":"Update fail"});
        //     }
        // })

        if (check === "1") {
            var infoSaveDB = {
                "userSend": temp[2],
                "nameSend": temp[3],
                "timeSend": temp[4],
                "date": temp[5],
                "time": temp[6],
                "place": temp[7],
                "status": temp[8],
                "read": "0",
                "seen": "0"
            }
            infoInvatition.findOneAndUpdate({ userRecevice: temp[0] }, { $push: { invatitions: infoSaveDB } }, { safe: true, upsert: true, new: true }, function (err, data) {
            });
        }
        else {
            var infoSaveDB = {
                "userSend": temp[0],
                "nameSend": temp[1],
                "timeSend": temp[4],
                "date": temp[5],
                "time": temp[6],
                "place": temp[7],
                "status": temp[8],
                "read": "1",
                "seen": "1"
            }
            infoInvatition.findOneAndUpdate({ userRecevice: temp[2] }, { $push: { invatitions: infoSaveDB } }, { safe: true, upsert: true, new: true }, function (err, data) {
            });
        }
    }
}