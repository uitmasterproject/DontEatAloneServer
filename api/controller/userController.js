var register=require("../method/register");
var login=require("../method/login");
var blog=require("../method/blog");

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
        login.getProfile(phone,function(data){
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
}