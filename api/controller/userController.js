var register=require("../method/register");
var login=require("../method/login");
var blog=require("../method/blog");
var notification=require("../method/notification");
var profile=require("../method/profile");

module.exports=function(app){
    app.post("/register",function(req,res){
        var userdb =req.body;
        register.registerNewUser(userdb,function(data){
            res.json(data);
        })

    });

    app.post("/register/:phone",function(req,res){
        var phone=req.params.phone;
        register.checkPhoneExits(phone,function(data){
            res.json(data);
        })
    });

    app.put("/forgetpass/:phone/:password",function(req,res){
        var phone=req.params.phone;
        var password=req.params.password;
        login.changePassword(phone,password,function(data){
            res.json(data);
        })
    });

    app.post("/login/:phone/:password",function(req,res){
        var phone=req.params.phone;
        var password=req.params.password;
        login.checkLogin(phone,password,function(data){
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

    app.post("/statusblog/:phone", function(req,res){
        var infoBlog = req.body;
        var phone = req.params.phone;
        blog.addStatus(phone,infoBlog,function(data){
            res.json(data);
        })
    })

    app.get("/statusblog/:phone",function(req,res){
        var phone=req.params.phone;
        blog.getAllStatus(phone,function(data){
            res.json(data);
        })
    })

    app.delete("/statusblog/:phone/:date",function(req,res){
        var phone=req.params.phone;
        var date=req.params.date;
        blog.deleteStatusBlog(phone,date,function(data){
            res.json(data);
        })
    })

    app.get("/notification/:phone",function(req,res){
        var phone=req.params.phone;
        notification.getInfoNotification(phone,function(data){
            res.json(data);
        })
    })

    app.put("/notification_update_read/:phoneRecevice/:phoneSend/:status/:timeSend",function(req,res){
        notification.updateReadNotification(req.params.phoneRecevice,req.params.phoneSend, req.params.status, req.params.timeSend);
    })

    app.post("/profile_update",function(req,res){
        console.log(req.body);
        profile.updateProfile(req.body.phone,req.body.which,req.body.content,function(data){
            
        })
    })
}