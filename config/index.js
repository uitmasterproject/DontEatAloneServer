var accountUser=require("./config");

module.exports={
    connectdbString:function(){
        return `mongodb://${accountUser.name}:${accountUser.password}@ds159050.mlab.com:59050/donteatalone`
    }
}