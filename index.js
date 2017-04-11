var express= require("express");
var bodyParser=require("body-parser");

var app= express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(true));

app.set("view engine","ejs");

var port= process.env.PORT||3000;

require("./api/controller/userController")(app);

app.listen(port, function(){
    console.log("Server is connecting in port: "+port);
})
