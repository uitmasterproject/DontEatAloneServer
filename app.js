var express = require("express");
var bodyParser= require("body-parser");
var mongoose=require("mongoose");
var account=require("./config");


var app=express();
var port= process.env.PORT||3000;

var server=require("http").createServer(app);
var io=require("socket.io")(server);

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

mongoose.connect(account.connectdbString());

require("./api/controller/socketController")(io);
require("./api/controller/userController")(app);

server.listen(port, function(){
    console.log("server is connecting in port: "+ port);
});