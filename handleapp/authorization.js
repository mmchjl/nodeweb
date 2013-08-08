/**
 * Created with JetBrains WebStorm.
 * User: NL_LE
 * Date: 13-6-28
 * Time: 下午1:37
 * To change this template use File | Settings | File Templates.
 */

var mongo  = require("../lib/mongoClient.js"),
    handleBase = require("./handleAppBase.js").handleBase;

var _handler = {
    login:function(header,response){
/*          var option={
              collection:"user",
              query:{
                  account:header.queryString.account,
                  password:utility.MD5(header.queryString.password)
              }
          }
        mongo.findOne(option,function(err,data){
            if(err){
                utility.handleException(err);
                response.endJson({result:false,code:500,msg:err.message});
            }else{
                response.endJson({result:true,code:200});
            }
        })*/
        var uid = header.fields.account;
        var pwd = header.fields.password;
        console.dir({
            uid:uid,
            pwd:utility.MD5(pwd)
        });
        header.session.session.authorization = true;
        response.endJson({result:true,data:{author:true}});
    },
    check:function(header,response){
        var account = header.queryString.account;
        _h.checkExists(account,function(result){
            if(result){
                response.end(JSON.stringify({result:false,code:0}));
            }else{
                response.end(JSON.stringify({result:true,code:1}));
            }
        })
    }
};

var _h = {
    checkExists:function(accout,callback){
        var option = {
            collection:"user",
            query:{
                account:accout
            }
        };
        mongo.findOne(option,function(err,data){
            if(err){
                utility.handleException(err);
            }
            if(utility.isNull(data)){
               callback(false);
            }else{
                callback(true);
            }

        })
    }
};

var app = new handleBase("user",_handler);

function handle(header,response){
    return app.handle(header,response);
}

module.exports.handle = handle;