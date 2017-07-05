var Restaurant = require("../model/restaurantModel");

module.exports.getRestaurant = function (latlng, callback) {
    var listRestaurant = new Array();
    Restaurant.find({}, function (err, result) {
        console.log("hello");
        if (result.length > 0) {
            console.log(result);
            result.forEach(function (element) {
                var latDistance = (latlng.split(",")[0] - element.latlng.split(",")[0]) * Math.PI / 180;
                var lngDistance = (latlng.split(",")[1] - element.latlng.split(",")[1]) * Math.PI / 180;
                var a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                    + Math.cos((latlng.split(",")[0]) * Math.PI / 180) * Math.cos((element.latlng.split(",")[0]) * Math.PI / 180)
                    * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var distance = (Math.round(6371 * c));
                console.log(distance);
                if(distance<15000){
                    listRestaurant.push(element);
                }
            }, this);
            console.log(listRestaurant.length);
            callback(listRestaurant);
        }
    })
};


module.exports.getRestaurantFollowLatlng = function (latlng, callback) {
    var listRestaurant = new Array();
    Restaurant.find({}, function (err, result) {
        console.log("hello");
        if (result.length > 0) {
            console.log(result);
            result.forEach(function (element) {
                var latDistance = (latlng.split(",")[0] - element.latlng.split(",")[0]) * Math.PI / 180;
                var lngDistance = (latlng.split(",")[1] - element.latlng.split(",")[1]) * Math.PI / 180;
                var a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                    + Math.cos((latlng.split(",")[0]) * Math.PI / 180) * Math.cos((element.latlng.split(",")[0]) * Math.PI / 180)
                    * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var distance = (Math.round(6371 * c));
                console.log(distance);
                if(distance<10){
                    listRestaurant.push(element);
                }
            }, this);
            console.log(listRestaurant.length);
            callback(listRestaurant);
        }
    })
};

module.exports.getRestaurantFollowDistrict= function(district, callback){
    console.log(district);
    var listRestaurant = new Array();
    Restaurant.find({}, function (err, result) {
        if (result.length > 0) {
            result.forEach(function (element) {
                if(element.address.indexOf(district)!=-1){
                    listRestaurant.push(element);
                }
            }, this);
            console.log(listRestaurant.length);
            callback(listRestaurant);
        }
    })
};

module.exports.getAllRestaurant= function(callback){
    var listRestaurant = new Array();
    Restaurant.find({}, function (err, result) {
            listRestaurant=result;
            console.log(listRestaurant.length);
            callback(listRestaurant);
    })
};

