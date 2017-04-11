var register=require("../method/register");


module.exports=function(app){

    app.post("/register", function(req,res){
        var user=req.body;
        console.log(user);
        register.registerUser(user,function(data){
            console.log(data);
            res.json(data);
        })
    });
    app.post("/register/:phone", function(req,res){
        var phone= req.params.phone;
        console.log(phone);
        register.checkPhoneRegister(phone, function(data){
            console.log(data);
            res.json(data);
      })
    })
};