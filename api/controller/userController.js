var register=require("../method/register");
var login=require("../method/login");
var blog=require("../method/blog");

module.exports=function(app){
    app.post("/register",function(req,res){
        var userdb =req.body;
        console.log(userdb);
        register.registerNewUser(userdb,function(data){
            console.log(data);
            res.json(data);
        })

    });

    app.post("/register/:phone",function(req,res){
        var phone=req.params.phone;
        console.log(phone);
        register.checkPhoneExits(phone,function(data){
            console.log(data);
            res.json(data);
        })
    });

    app.put("/forgetpass/:phone/:password",function(req,res){
        var phone=req.params.phone;
        var password=req.params.password;
        console.log(phone+" "+password);
        login.changePassword(phone,password,function(data){
            console.log(data);
            res.json(data);
        })
    });

    app.post("/login/:phone/:password",function(req,res){
        var phone=req.params.phone;
        var password=req.params.password;
        console.log(phone+" "+password);
        login.checkLogin(phone,password,function(data){
            console.log(data);
            res.json(data);
        })
    });

    app.post("/user/:phone",function(req,res){
        var phone=req.params.phone;
        console.log(phone);
        login.getProfile(phone,function(data){
            console.log(data);
            res.json(data);
        })
    });

    app.post("/statusblog", function(req,res){
        var infoBlog = req.body;
        console.log(infoBlog);
        blog.addStatus(infoBlog,function(data){
            console.log(data);
            res.json(data);
        })
    })

    app.get("/statusblog",function(req,res){
        blog.getAllStatus(function(data){
            console.log(data);
            res.json(data);
        })
    })
}