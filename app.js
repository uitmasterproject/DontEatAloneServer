var express = require("express");
var bodyParser= require("body-parser");
var mongoose=require("mongoose");
var account=require("./config");

var app=express();
var port= process.env.PORT||3000;

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

mongoose.connect(account.connectdbString());

require("./api/controller/userController")(app);

app.listen(port, function(){
    console.log("server is connecting in port: "+ port);
})